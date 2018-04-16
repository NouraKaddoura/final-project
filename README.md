# MentorHub [link](https://secret-plains-23506.herokuapp.com/)

![Link](https://i.imgur.com/3N5kp4W.jpg)

### Overview

MentorHub is designed to connect mentees with mentors in areas of growth and development. It has a unique functionality of having all users comment and interact with each other while linking the users to other resources such as meetups in their area from the site Meetup.com. The vision is to help this app create community and connect people who seek menorship virtually and also have a forum to write their questions, comments, or advice to other members. 

* This is a full-stack application (MERN STACK) with a restful API. 

### During the Planning Stage:

At first I had two models, one for mentor and one for mentees but then discovered it would simplify the complexity of the project to have just one model with a Boolean of whether or not the user was a mentor. 

![link](https://i.imgur.com/908qabL.png)
![link](https://i.imgur.com/gnu1twK.png)

### The Approach I took to managing each task:
Daily To Do list:
![link](https://i.imgur.com/XXz9O7W.jpg)

### Installation + Development

1. `git clone` this repository to your local machine.

2. run `npm install` from the cloned repo directory.

3. create a `.env` file at the root of the application, adjacent to `server.js`.
  * It's recommended that you run the api server on port 3001 while developing locally, as  the client app will default to port 3000.
5. Intialize `mongod` 
6. Initialize `nodemon`.
7. Next, in the client application. `cd client`
    * run `npm install`
    * run `npm start` to boot up the client application.

8. Start using the application and customize as you wish!

### Technologies

- NodeJS + Express + Mongoose on the back
- React client application on the front
- React Router 4.*
- Reactstrap (Bootstrap for React)
- JSON Web Token authentication flow
- Axios 
- lodash
- Bcrypt

### User Stories:

* As a User, I want to be able to look through a variety of posts.
* As a User, I want to be able to add a mentor. 
* As a User, I want to be able to delete a mentor. 
* As a User, I want to be able to customize my profile and view other profiles. 
* As a User, I want to be able to comment on posts.
* As a User, I want to be able to know why I can't sign up or Login. 
* As a User, I want to find local meetups where I could connect with more mentors. 

