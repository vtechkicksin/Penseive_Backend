const express = require("express");
const path = require("path");

const mysql = require("mysql");
const dotenv = require("dotenv").config({path:'./.env'});

const bodyParser = require("body-parser")
const cors = require("cors");
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const dp = require("./dbConnection/dbcon")
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.set('view engine','hbs');

const controller = require('./routes/pages');
app.use(controller);
const autho = require("./routes/router");
app.use(autho);



app.listen(5000,()=>{
    console.log("We are flying on port 5000");
})