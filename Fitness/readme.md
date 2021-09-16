Please read this file.

This readme contain information to both the backend and frontend systems of this application as well as general information. 

Welcome

------------General usage instructions-----------
This is an application created using express and React. The front end has been created using create-react-app.
The purpsose of this app is to serve as a fitness tracking app. 

This app allows access to normal end-users as well as admins.
The following instructions will be labled "user" or "admin" to indicate to who the instructions are aimed.

In the navBar there is an about link that will display some information about the app.
Click on home to return to previous page.

User
Firstly a user can create a profile and login in to their profile.
A user can manually submit their activity by entering a description, choosing the type and aentering the duration of an activity.
The user will be able to remove activities from their list.
The user can also navigate to the 'activity count' tab to see how many activities they have logged.

Admin
An admin can log into the admin portal and view all current user that are registerd on the app. 
An admin can remove users from the database.
An admin can update a user in the database.


How to use the app:
User
Sign up
Navigate to sign up if you do not have profile.
-Enter Name,email,password and confirm password to create an account.
You will be redirectied to the login page.

Login
Login with your email and password.
You will be redirected to the activities page.

Activities
To add an activity
1.Simply type the description into the description bar.
2.Select the activity type from the dropdown.
3.Enter the duration of the activity in minutes. ie 2 hours activity will be entered as 120.

The activity will be added to your database.
To view the activities scroll to the Activity Stats section on your page. There are two tabs: "all" and "activity count".
4.Click on the "all" tab to view all activities.
5.In this tab tthe activities are displayed. There is also a RED X next to each which will delete the activity when clicked.
6.Click on the Activity count Tab. This will display a table with the number of activities that you have logged. 

Click on the logout button to sign out of your profile.

Admin
1.Navigate to the login page via the navBar
2.Login using the following credentials
	email:admin@gmail.com
	passwird:admin1
3.You will be redirected to the admin page. 
4. Here you will see a list of all the users that currently have signed up as well as the admin user.
5. You can delete a user by highlighting the user id of the user and pasting it in the the "Enter ID" text box. CLick on delete
6. You can update a user by highlighting the user id of the user and pasting it in the the "Enter ID" text box. Enter all other fields and click on update

***NOTE***
Please do not delete the admin account as at this stage a admin can only be created manually by the app creator.
The user table does not automatically refresh. A manually refresh will cause the admin to logout. When navigating to the about page and back to the admin page the updates will take effect.


Click on the logout button to sign out of your admin profile.


------------This next section explains how a user can install,test and run the app from their local machine.-----------

1.Copy the project folder to desired location on your local machine.

2.Backend:
2.1 To install and start this application navigate to project directory in your command line.
2.2 cd fitness
2.3 npm install (install dependencies and node modules)
2.4 npm start ( will run the backend system of the application)

3.Frontend:

3.1 To install and run this application navigate to project directory in your command line.
3.2 cd frontend
3.3 npm install (install dependencies and node modules)
**note**
Be sure that the backend code is also running.
3. npm start ( will run the frontend system of the application)

App will run at : "http://localhost:3000/"


-----------Testing the app-------------

Backend:
To test this app with postman follow these steps

Starting up:
-Open postman
-navigate to my workspaces and select 'new'. Select Requests block

** note ** Ensure that your server is running by typing npm start in the cmd line. (See install,test and run section for backend) 
Sign up testing:

-select Post from the dropdown
-Enter "http://localhost:8080/api/signup' into the 'enter reqeust url' tab
-Select body,raw and JSON.
Type :
{
    "name":"admin",
    "email":"admin@gmail.com",
    "password":"admin1",
    "password2":"admin1",
    "admin":"true"
}

values can be anything except "admin" can only be "true" or "false".
-Click on send.

Login Testing
-select Post from the dropdown
-Enter "http://localhost:8080/api/signin' into the 'enter reqeust url' tab
-Select body,raw and JSON.
Type:
{
    "email":"1@gmail.com",
    "password":"111111"
}
Type in the values of any "user" that exists.

Activties test.
Create a user at signup with admin:false.
Open new tab in postman.
-select get from dropdown
-Enter "http://localhost:8080/activity' into the 'enter reqeust url' tab
-enter authorization tab and select bearer token from dropdown
-Click send. You should see a list of activities.

Admin test
Log in or sign up with any user with admin:true.
Open new tab in postman.
-select get from dropdown
-Enter "http://localhost:8080/admin' into the 'enter reqeust url' tab
-enter authorization tab and select bearer token from dropdown
-Click send. You should see a list of users.


To run written tests for the application

1.run npm start
2.in new cmd line cd backend
3.npm test

There is one test that will run. The test checks if the request fails that a 404 error is received when a incorrect port is used.

**note**
The written test for this app can be found in the following directory "backend/test/users.test.js"



Frontend:

To test this code:
1. cd frontend
2. npm test

**note**
The written test for this app can be found in the following directory "backend/frontend/src/app.test.js"

There are two tests that will run.
Snap shot test.
This test will test if the app component which is the parent component of the app renders correctly and does not rerender unexpexctadly.

The second test is a unit test that will test the following functionality:
I want to test the fetch request but I could not get a working test.


--------------------Security measures--------------------
This app is secured by helmut.
No API keys were are used to run this application.
JWT authentication is used to authenticate users and admin roles in the app.

-------------------Link to deplyed app-------------------
The app is deployed to Heroku. The back end and frontend is deployed together. This is done through heroku and express. Express runs a postbuild script that build the frontend on the heroku server. 
Link:
https://mark-fitness-app.herokuapp.com/


-------------------System architecture-------------------
Following is a brief the description of the system architecture that we will use to for the fitness tracking app.
Firstly we will be using a layered architecture pattern. This is simply a pattern which is constructed of different layers for multiple functions of the app. Each layer will be using components which give it the required functionality. These components will be re-used in different layers if applicable. This pattern can be broken down in and explained by stating the web stack that we will use to create the app.
We will be using the MERN stack. Below is a short description of every element of the MERN stack and how it is used to create our fitness tracking app.
M – Mongo db (the database that we will be using)
We will use Mongo db to store all the data that our app will use including:
•	User information(user profile and security data)
•	User information(admin purposes)
•	User activities
E – Express JS
We will be using express JS to create our custom server for the app. Within this server there will be different components performing different functionalities for the app. Most of these functions can be described as the back-end of the app as these are function that happen based on user input and action.
Below is a list and short description of each component that will be included in the back-end of our app.
•	Server component
Here the necessary functions will be created that includes the following:
o	Connection configurations to our Mongo database.
o	Importing of all routes and middleware
o	Use functions for all routes and middleware
o	Error 404 handler
o	Custom server configuration


•	Routes component
By using the express router this component will be used to route our controller components functions’ to the server component.

•	Model component
This component will be used to create a custom schema for the data that will be saved in our database. We have two models, one that will be used for the user information pertaining to user login and profile information and the other for user activities.

•	Controller component
This component will be used to interact with our database. The basic CRUD operations and user authentication functions will be performed by the controllers.
We will have two controller components which will be briefly explained below.

Authorization controller
This component will handle the user sign-up, user sign-in and admin sign-in. 
The function in this controller will be sent via the route component to the server component and interact with our database in MongoDb.

Activity controller
This component will handle all the activities that a user wants to add, edit or delete from their profile. It will work in a similar way to the authorization component regarding interaction with the database. The function will consist of CRUD operations. 
Note*
All the components in the back-end (express) side of the app will be tested with postman for general functionality. More precise tests will be written to test individual functions. 
This is a benefit of using the layered pattern architecture. These components can be tested without the front-end. 
R – React.JS 
We will use create-react-app to build the front-end of our app. The front-end of the app will act as both the user interface that the user will interact with as well as a link between react and express by using functions such as ‘fetch’ or ‘axios’.
We will use create-react-app as it creates a template that is ideal for this app.
Styling for the front-end of the app will be done with bootstrap for react as well as custom CSS styling. The main layout and components will be styled by react-bootstrap. The layouts are easy to use and customize for our purposes. The final styling will be done with custom CSS styling.
The entire front-end will be compiled of different components namely:
•	Home – a simple page with buttons to sign-up or sign-in. This file will be named index.js in the directory of the app. 
•	Navigation – The navigation menu that will consist of Home, About, Profile and Stats.
•	About page – a simple page providing more information regarding the app.
•	Sign-up  - This component will allow a user to create a profile
•	Admin page – This component will allow an admin to see all users and make changes to them.
•	User profile – This component is where a user can enter their activities.
•	User stats – This component will show the user stats i.e. Total time of exercise, exercise count etc. 
N – Node.JS
Node.JS is the environment that we are creating our app in. In this case Node.JS is a JavaScript environment which enables us to develop our app in both React.JS and Express.JS. Node.js allows us to use JavaScript throughout the development of the app.
Motivation to use the MERN stack
The MERN stack is used as it is the tools that I am most familiar with and being able to use JavaScript throughout the project ensures consistency and will promote successful debugging and testing as well as updating the app in the future.
I have chosen to use the layered architecture pattern because the web stack can be broken down into components and each component can be developed and tested without the relying on the full system to be working. This ultimately will help ensure that each component performs its required functions without the chance of other components interfering.
Deployment
We will deploy the app with Heroku. Heroku is used because it is a service that I am familiar with and have had success with in the past. 


System requirement specification
This section will aim to describe the app and list and describe all the functional and non-functional requirements of the fitness tacking app. User stories will be included to describe how the app will work for both the user and development side.
Overview
The fitness tracker app will with its first version be a simple tracking tool for users to log their workouts and be able to retrieve some statistics regarding their workouts. A user will be able to create a profile by signing up. After this the user would be able to view their profile and log activities. 
Logging an activity will, with the first version of the app only include the type of activity and the duration of the activity.  The activity can then be deleted or updated.
Users will be able to view a stats page that will display the following data:
•	Activity count
•	Total activity duration
Functional requirements
The app should consist of the following functionality:
•	Sign up
•	Sign in
•	Admin sign in
•	Admin functionality
•	Add activity
•	Delete activity
•	Edit existing activity
•	View activities
•	View stats on activities
•	About information page

Functional requirements – methods and application
Sign up – The user should be able to sign up by navigating to the sign up page via the “sign-up” button. Once the user has landed on the page they will be required to provide details which include first name, last name, username and password. This information will be saved to the Mongo database and used to authenticate a user at the sign in stage.
The user will also be able to sign up with their existing Gmail or Facebook credentials.
Sign in – The user will be able to sign in to their profile by providing the app with their username and password. Once they have provided the required information the user will be directed to their profile page after clicking the “sign in” button.

Admin sign in – An admin of the app will be able to sign in to the admin page of the app that will allow direct them to the admin page of the app.

Admin functionality – The admin would be able to view all user that have created profiles in the app. The admin would also be able to delete or update any user.

Add, delete or edit/update activities – A user will be able to add a new activity by providing the type of activity and the length of the activity. This data will be save d to the Mongo database.
After an activity was added by the user they will be able to view the activity and have the option to delete the activity.

View stats – This page will allow a user to view the total number of activities that they have logged. 

Non-Functional requirements
The app should consist of the following non-functional requirements:
Usability 
•	Easy and intuitive UI & UX
•	Thorough README document containing all instructions to use the app
Reliability
•	Thorough testing implemented in the design phase of the app to ensure minimal bugs through the use of postman and written tests using mocha and chai which will include functional tests and snapshot tests.
Performance
•	App will be designed and tested to function with perceived maximum workload required by the client. This will ensure smooth work flow and operation of the program.



Security 
•	Client-side security is ensured by the sign-in functionality.
•	Additional security measures will be taken on the server-side to ensure all data is secure and protected.
•	The middleware Helmut will be used to further increase security of the app. 
Support
•	All updates will be done on the server-side. Updated version of the app will always be available to user.
Design constraints
•	Hardware referring to servers must be maintained or owned by app creators.
•	App will be developed for browser use only and not mobile use at this stage.
Target users and motivation
The app will be aimed at all individuals who have an interest in tracking their workouts. Within the first version of the app the functionality will be simple but one of the main focus points of the development will be to create a stylish, attractive and intuitive user interface. This easy-to-use and interactive UI will be one of the characteristics of the app that will set it apart from existing apps.
The app will also be structured in a manner that will allow for future updates to be easily developed and increase the functionality.



User Stories
#1
User-side
Use case
As a user I would like to be able to create a personal profile in the app.
Use case description
User should be able to create a personal profile by entering afirst name, last name, username and password.

Developer –side
Use case
As a developer a working database should be set up to save user login credentials.
Use case description
A database must be set up that will save and encrypt the username and password that a user chooses for their personal or team profile.

#2
User-side
Use case
As a user I would like to be able to log in to my profile.
Use case description
User should be able to log into their personal profile by typing their username and password into a text field and clicking a “sign in” button. This will direct them to their profile page.

Developer-side
Use case
As a developer a server component should interact with a database and retrieve a specific users’ password and autenticate it to allow access to the user profile.
Use case description
When a user enters their username and password to log in, the code written by the developer will authenticate the password with the help of JWT tokens. This code will interact with the server component that interacts with the database.


#3
User-side
Use case
As a user I would like to be able to add activities to my profile.
Use case description
A user should be able to add an acticity to their profile by selecting an activity type and typing in the duration of the activity.

Developer-side
Use case
A working database should be setup that will save user actvities.
Use case description
A database must be setup that will save the activities that a user adds to their profile. This will be done in a simialr way that the user login credentials are stored.
