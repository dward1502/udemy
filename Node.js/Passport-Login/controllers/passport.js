const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
//const GoogleStrategy = require('passport-google-auth').OAuth2Strategy;
const GoogleStrategy = require('passport-google').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('../models/user');
const bcrypt = require('bcrypt');

const configAuth = require('../config/auth');

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// });

// passport.deserializeUser((user, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });
error500 = (err) => {
  console.log(err);
  res.status(500).json({
    error: err
  });
}
error404 = () => {  
  res.status(404).json({
    message: "Auth Failed"
  })
}

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req,email,password,done){
  User.findOne({'local.email' : email}).then((err,user) => {
    if(err){
      error500(err);
    }
    if(user) {
      return done(null, false, req.flash('error_msg','That email is already taken'));
    } else {
      const newUser = new User({
        'local.email' : email,
        'local.password' : User.createUser(password),
        'local.username': req.body.username,
        'local.name': req.body.name
      });
      newUser.save().exec().then( result => {
        console.log(result);
        res.status(200).json({
          message: 'User Created'
        });
      }).catch(err => {
        console.log(err);
        error500(err);
      });
    }
  });
}));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req,email,password,done) => {
  User.findOne({'local.email': email}).exec().then( user => {
    if(!user) {
      return done(null,false,req.flash('error_msg', 'Auth failed'));
    }
    bcrypt.compare(password, user.local.password, (err,result) => {
      if(err){
        error404();
      }
      return done(null,user);
    }).catch(err=> {
      error500(err);
    });
  });
}
));

passport.use(new FacebookStrategy({
  clientID: configAuth.facebook.app_id,
  clientSecret: configAuth.facebook.app_secret,
  callbackURL: configAuth.facebook.callback
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({'facebook.id': profile.id}).exec().then((err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      } else {
        const newUser = new User({
          'facebook.id': profile.id,
          'facebook.token': accessToken,
          'facebook.name': profile.name.givenName + ' ' + profile.name.familyName,
          'facebook.email': profile.emails[0].value
        });

        newUser.save((err) => {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    }) 
}));

passport.use(new GoogleStrategy({
  clientID: configAuth.google.client_id,
  clientSecret: configAuth.google.client_secret,
  returnURL: configAuth.google.callback 
},(token,refreshToken,profile,done) => {
  User.findOne({'google.id': profile.id}).exec().then((err,user)=> {
    if(err){
      return done(err);
    }
    if(user) {
      return done(null,user);
    } else {
      const newUser = new User({
        'google.id':profile.id,
        'google.token': token,
        'google.name': profile.displayName,
        'google.email': profile.emails[0].value
      });

      newUser.save( err => {
        if(err) {
          throw err
        }
        return done(null,newUser);
      });
    }
  });
}));

passport.use(new TwitterStrategy({
  consumerKey: configAuth.twitter.consumer_key,
  consumerSecret: configAuth.twitter.consumer_secret,
  callbackURL: configAuth.twitter.callback
}, (token, refreshToken, profile, done) => {
  User.findOne({
    'twitter.id': profile.id
  }).exec().then((err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    } else {
      const newUser = new User({
        'twitter.id': profile.id,
        'twitter.token': token,
        'twitter.username': profile.username,
        'twitter.displayName': profile.displayName
      });
      newUser.save(err => {
        if (err) {
          throw err
        }
        return done(null, newUser);
      });
    }
  });
}));

passport.use(new GithubStrategy({
  clientID: configAuth.github.client_id,
  clientSecret: configAuth.github.client_secret,
  callbackURL: configAuth.github.callback
}, (token, refreshToken, profile, done) => {
  User.findOne({
    'github.id': profile.id
  }).exec().then((err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    } else {
      const newUser = new User({
        'github.id': profile.id,
        'github.token': token,
        'github.email': profile.email,
        'github.name': profile.displayName
      });
      newUser.save(err => {
        if (err) {
          throw err
        }
        return done(null, newUser);
      });
    }
  });
}));

passport.use( new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: configAuth.JWTsecret
}, (jwtPayload, cb) => {
  
  return User.findOneById(jwtPayload.id)
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
}

))