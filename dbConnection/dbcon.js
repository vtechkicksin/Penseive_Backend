const dotenv = require("dotenv").config({path:'./.env'});
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

db.connect((error)=>{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("MySql Connected...");
    }
})

module.exports=db;