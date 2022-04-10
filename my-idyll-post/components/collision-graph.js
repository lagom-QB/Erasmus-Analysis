const D3Component = require("idyll-d3-component");
const d3 = Object.assign(
  {},
  require("d3"),
  require("d3-transition"),
  require("d3-selection"),
  require("d3", "d3-array@2")
);

class CollisionGraph extends D3Component {
  initialize(node, props) {
    var t_data = props.value;
    var centroid = (nodes) => {
        let x = 0;
        let y = 0;
        let z = 0;
        for (const d of nodes) {
          let k = d.r ** 2;
          x += d.x * k;
          y += d.y * k;
          z += k;
        }
        return { x: x / z, y: y / z };
      },
      color = d3.scaleOrdinal(d3.range(m), d3.schemeCategory10),
      data = {
        children: Array.from(
          d3.group(t_data, (d) => d.group),
          ([, children]) => ({ children })
        ),
      },
      drag = (simulation) => {
        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      },
      forceCluster = () => {
        const strength = 0.2;
        let nodes;

        function force(alpha) {
          const centroids = d3.rollup(
            nodes,
            centroid,
            (d) => d.data["Country Code Cat"]
          );
          const l = alpha * strength;
          for (const d of nodes) {
            const { x: cx, y: cy } = centroids.get(d.data["Country Code Cat"]);
            d.vx -= (d.x - cx) * l;
            d.vy -= (d.y - cy) * l;
          }
        }

        force.initialize = (_) => (nodes = _);

        return force;
      },
      forceCollide = () => {
        const alpha = 0.4; // fixed for greater rigidity!
        const padding1 = 2; // separation between same-color nodes
        const padding2 = 6; // separation between different-color nodes
        let nodes;
        let maxRadius;

        function force() {
          const quadtree = d3.quadtree(
            nodes,
            (d) => d.x,
            (d) => d.y
          );
          for (const d of nodes) {
            const r = d.r + maxRadius;
            const nx1 = d.x - r,
              ny1 = d.y - r;
            const nx2 = d.x + r,
              ny2 = d.y + r;
            quadtree.visit((q, x1, y1, x2, y2) => {
              if (!q.length)
                do {
                  if (q.data !== d) {
                    const r =
                      d.r +
                      q.data.r +
                      (d.data["Country Code Cat"] === q.data.data.group
                        ? padding1
                        : padding2);
                    let x = d.x - q.data.x,
                      y = d.y - q.data.y,
                      l = Math.hypot(x, y);
                    if (l < r) {
                      l = ((l - r) / l) * alpha;
                      (d.x -= x *= l), (d.y -= y *= l);
                      (q.data.x += x), (q.data.y += y);
                    }
                  }
                } while ((q = q.next));
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          }
        }

        force.initialize = (_) =>
          (maxRadius =
            d3.max((nodes = _), (d) => d.r) + Math.max(padding1, padding2));

        return force;
      },
      height = 700,
      m = 10,
      n = 200,
      pack = () =>
        d3.pack().size([width, height]).padding(1)(
          d3.hierarchy(data).sum((d) => d.Count)
        ),
      width = 400,
      chart = () => {
        const nodes = pack().leaves();

        const simulation = d3
          .forceSimulation(nodes)
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("x", d3.forceX(width / 2).strength(0.01))
          .force("y", d3.forceY(height / 2).strength(0.01))
          .force("cluster", forceCluster())
          .force("collide", forceCollide());

        var svg = d3.create("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        const node = svg
          .append("g")
          .selectAll("circle")
          .data(nodes)
          .join("circle")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("fill", color)
          .call(drag(simulation))
          .on("click", (d, i) => switchRadius(400, i)());

        node
          .transition()
          .delay((d, i) => Math.random() * 500)
          .duration(750)
          .attrTween("r", (d) => {
            const i = d3.interpolate(0, d.r);
            return (t) => (d.r = i(t));
          });

        simulation.on("tick", () => {
          node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        });

        function switchRadius(newRadius, index) {
          return function () {
            d3.selectAll(".node")
              .filter(function (d, i) {
                return i === index;
              })
              .transition()
              .duration(1000)
              .tween("r", function (d) {
                var that = d3.select(this);
                var i = d3.interpolate(d.r, newRadius);
                return function (t) {
                  d.radius = i(t);
                  that.attr("r", function (d) {
                    return d.r;
                  });
                  simulation.nodes(data);
                };
              });
            simulation.alpha(1).restart();
          };
        }

        function clicked(d, i) {
          if (d3.event.defaultPrevented) return; // dragged
          d3.select(this)
            .transition()
            .attr("r", (d) => d.r * 2);
          // switchRadius(300, i);
        }

        return svg.node();
      };
    console.log(chart());
    return chart();
  }
}

module.exports = CollisionGraph;
