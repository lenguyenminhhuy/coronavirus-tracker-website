## Live demo: 
https://covid19-tracker-website.minhthings.com/

## Motivation
COVID-19 has upended the lives of billion people for more than two years. It has caused 227 million infected cases and 4.6 million deaths people. Although the number of vaccinations passes 5 billion, is the pandemic really left behind? As we are living in unprecedented times, being well informed about the danger of the disease and staying up to date how the virus spreads are essential. To address the ongoing demand of people, the team decided to build an application regarding meaningful COVID visualizations that enable them to understand what is happening and how damage the current situation is. Therefore, people will seriously look after their healthy now and for the future in a changing world.

## Introduction

In response to the ubiquitous charts and maps of the pandemic, we map data getting from the APIs to the different graphs and perform them. The application allows users to track the data of confirmed cases, tested cases, death cases and vaccinated cases of each country as well as all over the world. Our Covid-19 Data Tracker website is trying to display as comprehensible as possible visualizations. Through the world map in dashboard page, users acknowledge that the pandemic plays out dissimilarly different scales concerning different measurements. Moving to the analysis page, users can dive deep into the statistics of different countries. On the other hand, the team created a page containing many latest news about the outbreaks’ circumstances around the world. Especially, for those who want to stay up to date with these newest reports, the application has a subscribe button that facilitate users to register their email, verify the email and then they will receive daily updated-news email. 

Despite the notable features, several drawbacks do exist. Firstly, due to the services we use to implement COVID-19 API, it takes some time to load the data for world map. Moreover, regarding latest news, instead of displaying thumbnail images corresponding to each news, we currently show a consistent image for all of article cards. The reason why we have not yet crawled the images for these updated articles is their HTML formats are not the same, which is challenging for us in data parsing.

## Software Architecture

<img align="center" src="https://user-images.githubusercontent.com/54904166/133883079-9093d9d3-84b4-4e33-86ac-46642bdda260.png"/>

The above diagram explicitly our implemented architecture for the project. To be specific, our architecture is completely based on AWS services to achieve optimal “cloud experience”. Cloud experiences facilitate us having the ease to accelerate the development of our application effectively as well as the scalability in terms of resources, especially with the implementation of serverless services.

In general, we have developed our project on microservice and serverless basis, thus, the project handles well for the measurements of scalability and adaptability thanks to the amazing AWS Cloud services.
For the data utilized in our tracker application (**dashboard**), we’ve conducted lots of research in terms of a reliable and up-to-date dataset and we finally came up with the appropriate dataset from OWID (Our World in Data).

The daily dataset not only contains updated case, deaths in terms of COVID-19 pandemic but also provides additional statistics and insights of all the countries (represented as ISO codes) recorded. With the provided information from the dataset, we have managed to gather necessary resources for creating many useful visualization charts for our application.

## Usage

#### Start the web server

Navigate to "coronavirus-tracker-website\backend\scraping" and first install all the dependencies

 `npm install`

Then start the web server with

`npm run start`

#### Start the client

Navigate to "coronavirus-tracker-website\frontend" and first install all the dependencies

`npm install`

Then start the client with

`npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
##### *Note:
If you has some error related to cors, please install [this Chrome extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)
