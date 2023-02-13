Q. How you can start this backend server ?

3 ways
1)node app.js
2)nodemon app.js
3)npm start

-> app.js is the main page where you can run a command node app.js or nodemon app.js however i have set package.json start script to nodemon app.js

I have used MySql database, installed XAAMP in my local system there i have declared database as nodejs-login inside it i have declared 2 tables 


table name "users" this is used to take data from users and i have used this at the time of login
table name "data" this is used to store data that you have given me to store DeviceId, Device_Type, ....

i have made 5 routers

router.post(
'/auth/register',
authController.register);    // This is to take the data from frontend check if user already exist if not then stores the data

router.post(
'/login',
authController.login);      // This is to validate and login 

router.get(
'/gpsData',
Authentication.checkToken,
authController.data);

router.get(
    '/pageData',
    Authentication.checkToken,
    authController.page);       // this is a pagination APi used to render after login

router.get(
    '/searchData',
    Authentication.checkToken,
    authController.searchApi    // this is a search based on the DeviceId
);

