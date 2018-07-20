const express = require('express');
const router = express.Router();
const config = require('../config/auth');
const passport = require('passport');

isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/login', (req,res) => {
    res.render('login');
    
});
router.get('/logout', (req,res) => {
    res.render('login');
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect:'/login',
    failureRedirect:'/register',
    failureFlash: true
}));

router.post('/login', (req,res,next) => {
    passport.authenticate('local-login', {session: false}, (err,user) => {
        console.log("[User metadata]", user);
        if(err || !user) {
            return res.status(400).json({
                message: 'Auth Failed',
                user: user
            });
        }
        req.login( user, {session: false}, (err,result) => {
            if(err) {
                res.send(err);
            }
            if(result) {
                const token = jwt.sign({
                        user: user
                    },
                    config.JWTsecret, 
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Auth Successfull',
                        return: token
                    });
            }
            return res.status(404).json({
                message: "Auth failed"
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
    });
});

router.get('/facebook', passport.authenticate('facebook', {
    scope:['public_profile', 'email']
}));
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect:'/login'
}));

router.get('/google', passport.authenticate('google', {scope: ['profile','email']}));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect:'/login'
}));

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
}));




module.exports = router;