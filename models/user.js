const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const config = require("../config/database");


const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});

const User = module.exports = mongoose.model("User",UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(username) {
    const query = { username: username };
    
    return User.findOne(query).exec()
        .then(user => {
            if (user) {
                return user;
            } else {
                throw new Error("User not found");
            }
        })
        .catch(err => {
            throw err;
        });
};


module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt,(err,hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save();
        })
    })
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash, ( err, isMatch) => {
        if(err)  return callback(err,false);
        callback(null,isMatch);
        
    });
}