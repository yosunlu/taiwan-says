# Taiwan-says
## Introduction

As a meme enthusiast, I love to share memes with others, but quite often I get ignored (已讀), or even worse, they don't appreciate my sense of humor. To prove my sense of humor surpasses that of all my friends, I created this website, which allows user to sign in with google account and upload their favorite meme videos. Users can give stars to the memes they like, and the website will show the current leaders, and display users' memes in the order of total stars acquired.

There are several functions under construction (listed below), but at current state users are free to sign in and upload videos: [onlememes.web.app](https://onlememes.web.app/)

## Visuals
👽 Users can sign in by clicking the sign-in button  
👽 Current Leaders board disaplays the leaders and their stars
👽 Be sure to hover over the Yao Ming icon


![Home](screenshots/home.png)

👽 After signing in, the upload button will appear


![Sign-in](screenshots/sign_in.png)

👽 Videos will be dislpayed in the order of total stars  
👽 Thumbnails are the same to prevent spoilers


  ![List](screenshots/list.png)



## Technologies used
Just to clarify, this is NOT some random youtube clone projects on youtube that uses Youtube APIs! (that was mouthfull)    
I (kind of) built my own server, and dealt with uploading and watching the videos myself 


👽 Frontend: plain Javascript, html, css
👽 Backend: Node.js Express.js 
👽 Database: MongoDB
👽 Cloud Services: Render

### Architecture

**APIs**
- Corresponding code can be found at /onlymemes-api-services
- Both functions are written at /index.ts, and deployed at Firebase (which connects to Cloud Run) with: `firebase deploy --only functions:generateUploadUrl`
- generateUpdateUrl()
  - When a video is uploaded by the client, the frontend will call uploadVideo() (/onlymemes-web-client/app/firebase/functions.ts) and generateUpdateUrl(), and generate an authenticated URL (permission of access to the bucket for this function needs to be granted)
  - generateUpdateUrl() returns a signed-URL; this signed-URL containes information (i.e. path) to upload the video
  - Once the video is uploaded to the raw bucket, Pub/Sub will be triggered
- getVideos()
  - this accesses Firestore's collection of videos, and returns an array of video data
  - like generateUpdateUrl(), this function is wrapped and called by the frontend (/onlymemes-web-client/app/firebase/functions.ts)

**Deployment**
- I deployed mongoDB with Render webservices, which is really easy to use. Highly reccommended


