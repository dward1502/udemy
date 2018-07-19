const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginApp');
const db = mongoose.connection;

const routes = require('./routes/index');
const users = require('./routes/users');
//Init App
const app = express();
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express validator
//app.use(expressValidator());
app.use(expressValidator({
    errorFormatter: function(param,msg,value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
//Connect Falsh
app.use(flash());
//Global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
app.use('/', routes);
app.use('/users', users); 

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () =>{
    console.log('Server started on port ', app.get('port'));
});

