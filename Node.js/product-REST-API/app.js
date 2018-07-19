const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://localhost27017/StoreTest');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Creates and provides CORS access Cross-origin-request-service
app.use((req,res,next) => {
    //* gives access to all pages can be a specific url as well
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type,Accept,Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

//Routes which handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes);
app.use('/user',userRoutes)

//Middleware to handle any errors 
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    //Forwards request with error
    next(error);
});
//Handles errors thrown from anywhere in application
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;