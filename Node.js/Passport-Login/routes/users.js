const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/login', (req,res) => {
    res.render('login');
    
});
router.get('/logout', (req,res) => {
    res.render('login');
});

router.post('/register', (req,res) => {
   let name = req.body.name;
   let email = req.body.email;
   let username = req.body.username;
   let password = req.body.password;
   let password2 = req.body.password2;
   //Validation
   req.checkBody('name', 'Name is required').notEmpty();
   req.checkBody('email', 'Email is required').notEmpty();
   req.checkBody('email', 'email is not valid').isEmail();
   req.checkBody('username', 'Username is required').notEmpty();
   req.checkBody('password', 'Password is required').notEmpty();
   req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

   const errors = req.validationErrors();
   if(errors){
     res.render('register', {
         errors: errors
     });
   }else {
    const newUser = new User({
        name:name,
        email:email,
        username:username,
        password:password
    });
    Users.createUser(newUser, (errors,user) =>{
        if(errors){
            throw err;
        }
        console.log(user);
    });
    req.flash('success_msg', 'You are registered and can now login');
    res.redirect('/users/login');
   }
   
});
  passport.use(new LocalStrategy(
    function(username, password, done) {
      Users.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password,user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                return done(null,user);
            }else {
                return done(null, false,{message: 'Invalid password'})
            }
        })
      });
    }
  )); 
passport.serializeUser((user,done) =>{
    done(null,user.id);
});
passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
        done(err, user);
    });
});
router.post('/login', passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login',failureFlash:true}), 
(req,res) => {
    res.redirect('/');
    // let email = req.body.email;
    // let password = req.body.password;
    // req.checkBody('username', 'Username is required').notEmpty();
    // req.checkBody('password', 'Password is required').notEmpty();
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope:['public_profile', 'email']
}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect:'/login'
}));

module.exports = router;