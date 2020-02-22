# Attendance-application
This is an attendance application for teacher and students. <br/>
Teacher can take attendance of students (change the present/absent). but students can't change it they can see only.<br/>

### Full App Demo: <a href="http://13.126.28.110:8011/"> Attendance-application </a>

## code description
It has three pages- Signup page, login page, and homepage(attendance sheet)<br/>
First interaction comes out with Login page, if user already logged in then it gives home page <br/>
If user not a student or teacher then it will render signup page. and there use can resister. <br/>

## Requirements and execution
1. clone the repo from my github. <br/>
2. after cloning go to Attendence-application directory and there you will get two more directories `backend` and `frontend` follow the below steps to run both:

#### backend:
1. go inside the backend directory and run `npm install` to install all necessory dependencies. and you also need to install mongodb in you system <i>to install mongodb go to :</i> <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/" >click here to install</a> <br/>
2. manage `.env` file, follow `.env_example` file inside backend directory. <br/>
3. run `nodemon server.js` to run your backend application and visit http://localhost:8010/

### frontend:
1. go inside the fronend directory and run `npm install` to install all necessory dependencies. <br/>
2. run command `npm start` to run the application and visit http://localhost:3010/
 
