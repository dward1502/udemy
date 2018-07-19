const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        index:true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type:String
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback)
        });
    });
}
module.exports.getUserByUsername = (username, callback) =>{
    let query = {username:username};
   console.log(query);
    User.findOne({query});
    console.log("Find user");
}
module.exports.getUserById = (id, callback) =>{
    console.log("get user by id");
    User.findById({id,callback})
}
module.exports.comparePassword =(candidatePassword, hash, callback) => {
    console.log("Compare password");
    bcrypt.compare(candidatePassword,hash, (err,isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    });
};