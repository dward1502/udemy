const mongoose = require('mongoose');
const validator = require('validator');
const JWT = require('jsonwebtoken');
const _ =require('lodash');
const bcrypt = require('bcrpytjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required:true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{Value} is not a valid email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength: 6
  },
  tokens:[{
    access:{
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return __dirname.pick(userObject, ['id','email']);
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  const decoded;

  try{
    decoded = JWT.verify(token,'abc123');
  } catch(e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email,password){
  const user = this;

  return user.findOne({email}).then(data => {
    if(!data) {
      return Promise.reject();
    }
   return new Promise ((resolve,reject) => {
     bcrypt.compare(password, user.password, (err,res) => {
       if(res) {
         resolve(user);
       } else {
         reject();
       }
     });
   });
  });
}

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = JWT.sign({_id:user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.concat([{access, token}]);

  return user.save().then( () => {
    return token;
  });
};

UserSchema.pre('save', function(next){
    const user = this;
    if(user.isModified('passowrd')) {
      bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;