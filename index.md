# What is special about the Erasmus Programme ?

Did you ever wonder about where people in the erasmus programme come from? how about where they are going to? Or what is the duration of the programme?
If you didn't, I did.
Fortunately, I was able to get my hands on data about the programme and went ahead to dig into it.
The data I'm using is pulled from [Erasmus link 2016-2020.](https://data.europa.eu/en)

With this analysis, I tried to answer these questions:  
1. Where are people travelling to?  
2. Where are they travelling from?  
3. What is the overall gender of people traveling?   
4. What cities do they travel to? Or from?  
5. At what level of education are they?  
6. What is the nationality of the people travelling?  
7. What is the gender of the traveller?

## Data Cleaning
I filtered the data to get the portions I was interested in the:

* Participant data 
* Sending organization 
* Recieving organization.  

_Columns_

* Field of education  
* Participant nationality  
* Education level  
* Participant gender  
* Sending country code  
* Sending city  
* Recieving country code  
* Recieving city

## [Data Analysis](https://notebooks.githubusercontent.com/view/ipynb?azure_maps_enabled=true&browser=safari&color_mode=dark&commit=7fa54d631928307867019d2b9a0f4501b8dda0eb&device=unknown_device&enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6c61676f6d2d51422f457261736d75732d416e616c797369732f376661353464363331393238333037383637303139643262396130663435303162386464613065622f657261736d75732e6970796e62&logged_in=true&nwo=lagom-QB%2FErasmus-Analysis&path=erasmus.ipynb&platform=mac&repository_id=479828550&repository_type=Repository&version=15#1b3b99e7-d75c-4706-9ddf-ca1421f6a13d)
Focus question was:    
_Where are people traveling from_ and consequently, _where are they travelling to_

### Approach
- Strip the portions of the data I'm not interested in. In this case, _Field of Education,Participant nationality, Education level, Participant gender_
- Created columns for categorical data for countries so I could easily sum them up while summarizing
- Performed summarization to get counts for what I need to answer my question.
From my analysis,   

<img width="437" alt="image" src="https://user-images.githubusercontent.com/28558929/183365413-eeb7b227-60b5-4786-ad14-b451c6fcb7c3.png">  
<img width="437" alt="image" src="https://user-images.githubusercontent.com/28558929/183365601-3a7f6d84-8592-4837-82a2-d794a7b6935c.png">  
<img width="688" alt="image" src="https://user-images.githubusercontent.com/28558929/183365717-fc56dd06-a72f-477c-ad52-f836ce2fd25b.png">   
- I can conclude that the majority of travellers are travelling to (and from) the United Kingdom, Germany and Hungary (_to London, Berlin and Budapest_).
- Mostly females are taking this programme.

From my analysis, I can conclude that the majority of travellers are travelling to the United Kingdom, Germany and Hungary (_to London, Berlin and Budapest_)

## Tools
* Python (VSCode)
* Observable
* Figma
* Tableau

## Next step
In the future, I wish to answer the question "Why do people join the Erasmus programme?"   
I'm guessing the prospect of a new city (or perhaps even a new country) is motivation. However, what would the data say?  

[💫 Resuling Dashboard 💫 ](https://public.tableau.com/app/profile/quinsy.brenda/viz/Erasmus_16537198405220/Dashboard1?publish=yes)
![Res](https://raw.githubusercontent.com/lagom-QB/Erasmus-Analysis/master/Dashboard%201-3.png)
