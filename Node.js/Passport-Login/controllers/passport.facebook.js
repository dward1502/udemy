const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const User = require('../models/user');
const configAuth = require('../config/auth');

module.exports = (passport) => {
  passport.serializeUser((user,done) => {
    done(null,user.id)
  });

  passport.deserializeUser((user,done) =>{
    User.findById(id,(err,user) => {
      done(err, user);
    });
  });


passport.use(new FacebookStrategy({
  clientId: configAuth.facebook.app_id,
  clientSecret: configAuth.facebook.app_secret,
  callbackURL: configAuth.facebook.callback
}, (accessToken,refreshToken,profile,done) => {
  process.nextTick(() => {
    User.findOne({'facebook.id': profile.id}, (err,user)=> {
      if(err) {
        return done(err);
      }
      if(user) {
        return done(null,user);
      } else {
        const newUser = new User({
          id : profile.id,
          token: accessToken,
          name : profile.name.givenName + ' ' + profile.name.familyName,
          email: profile.emails[0].value
        });

        newUser.save((err) =>{
          if(err) throw err;
          return done(null,newUser);
        });
      }
    });
  });
}));
}

exports.facebookRegister = () =>{

};
exports.facebookLogin = () => {};
