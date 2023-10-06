const express = require("express");
const router = express.Router();
const User = require("../models/user")
const passport = require("passport")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");
const config = require("../config/database")


router.post("/register",(req,res,next)=>{
    let newUser = new User({
        name : req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt,(err,hash)=>{
            if(err){
                res.json({success: false, msg:"failed to register"});
            }else{
            newUser.password = hash;
            newUser.save();
            res.json({success: true, msg:"user registered"})
            }
        })
    })
});

router.post("/authenticate",(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    User.getUserByUsername(username)
    .then(user => {
        User.comparePassword(password, user.password,(err,isMatch)=>{
            if(err)  return res.json({isMatch});
            if(isMatch){
                const token = jwt.sign(JSON.parse(JSON.stringify(user)), config.secret, {
                    expiresIn: 604800
                });
                
    
                res.json({
                    success: true,
                    token : "JWT"+token,
                    user:{
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }else{
                return res.json({success: false,msg:"Wrong password"});
            }
        })
        
    })
    .catch(error => {
        // Handle errors here
        res.json({success:false , msg:"There is no username"})
    });
});

router.get("/profile",(req,res,next)=>{
    res.send("profile");
});




module.exports = router;    
