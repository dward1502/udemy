const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    local:{
        username: String,
        password:  String,
        email: String,
        name: String
    },
    facebook : {
        id : String,
        token:String,
        name: String,
        email :String
    },
    google:{
        id: String,
        token : String,
        email: String,
        name: String
    },
    twitter: {
        id:String,
        token: String,
        displayName: String,
        username: String
    },
    github:{
        id: String,
        token:String,
        email:String,
        name: String
    }    
});

module.exports.createUser = (password) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if(err){
                return res.status(500).json({
                    error:err
                })
            } else {
               return  hashPassword = hash;
            }
        });
    });
}
// module.exports.getUserByUsername = (username, callback) =>{
//     let query = {username:username};
//    console.log(query);
//     User.findOne({query});
//     console.log("Find user");
// }
// module.exports.getUserById = (id, callback) =>{
//     console.log("get user by id");
//     User.findById({id,callback})
// }
// module.exports.comparePassword =(candidatePassword, hash, callback) => {
//     console.log("Compare password");
//     bcrypt.compare(candidatePassword, hash, (err,isMatch)=>{
//         if(err) throw err;
//         callback(null, isMatch);
//     });
// };
module.exports = mongoose.model('User', userSchema);