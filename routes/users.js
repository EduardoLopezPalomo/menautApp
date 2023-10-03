const express = require("express");
const router = express.Router();
const USer = require("../models/user")
const passport = require("passport")
const jwt = require("jsonwebtoken");
const e = require("express");

router.post("/register",(req,res,next)=>{
    let newUser = new User({
        name : req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser,(err, user)=>{
        if(err){
            res.json({success: false, msg:"failed to register"})
        }else{
            res.json({success: true, msg:"user registered"})
        }
    })
});

router.post("/authenticate",(req,res,next)=>{
    res.send("authenticate");
});

router.get("/profile",(req,res,next)=>{
    res.send("profile");
});




module.exports = router;    
