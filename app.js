const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

mongoose.connect(config.database);
mongoose.connection.on("connected",()=>{
    console.log("connected to database"+ config.database);
})
mongoose.connection.on("error",(err)=>{
    console.log("database error: "+ err);
})

const app = express();
const port = 3000;

const users = require("./routes/users");

app.use(cors());

app.use(express.static(path.join(__dirname,"public")));

//body parser middleware
app.use(bodyParser.json());

app.use("/users",users);

app.get("/",(req, res)=>{
    res.send("invalid endpoint");
})

app.listen(port,()=>{
    console.log("server started on:"+ port);
}) 