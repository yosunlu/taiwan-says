# Taiwan-says
## Introduction
![image](https://github.com/yosunlu/taiwan-says-server/assets/104919684/ab1b748b-b1a4-42c2-bfb9-c9c15424aa7d)

This is a mini-full stack project I use to learn mongoDB. The frontend code, which can be found in fronend-deploy branch, is fairly easy. The main branch contains the APIs I created with express and mongoDB. The server is deployed to Render webservices. The backend code is organized in a way that I hope is clear. 

The user can enter any quotes that he finds to be funny/trolling/useful translation of English usages. Once the user submits, the sentence will be stored to mongoDB.
Hopefully I can expand this tiny project to a full application in the future. 

Frontend code are in ./docs.

## Technologies used

👽 Frontend: plain Javascript, html, css 

👽 Backend: Node.js, Express.js  

👽 Database: MongoDB 

👽 Cloud Services: Render

### Architecture

**APIs**  
Basic CRUD operations. 

**Deployment**  
I deployed mongoDB with Render webservices, which is really easy to use. Highly reccommended.  

ref: https://www.youtube.com/watch?v=_7UQPve99r4&t=3601s

**Issues when fetching**
- Try running the endpoints locally first. If there's issue running locally, check MongoDB atlas configs.
  MongoDB URI can be found in render's environment setting. Replace mongoose.connect(process.env.MONGODB_URI) in 'index.js' with the string
  ![截圖 2024-06-30 下午6 25 18](https://github.com/yosunlu/taiwan-says/assets/104919684/bf436259-c230-45ea-9b57-1380e1dce432)

- If able to run locally, try re-deploy it on render: https://dashboard.render.com/.
- If still not working, delete the web service on render and create a new one.



