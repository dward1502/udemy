const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req,res,next) => {
    Order.find().exec().then(docs => {
        res.status(200).json({
            count: docs.length,
            orders:docs.map(doc=>{
                return {
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request: {
                        type:'GET',
                        url:'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}
exports.create_order = (req,res,next) => {
    Product.findById(req.body.productId)
    .then( product =>{
        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            productId: req.body.productId,
            quantity: req.body.quantity
        });
        return order.save().exec()
    }).then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Orders placed',
            createdOrder: {
                _id: result._id,
                product:result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url:'http://localhost:3000/orders/' + result._id
            }
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}
exports.delete_order = (req,res,next) => {
    Order.remove({_id: req.params.oderId}).exec().then( result =>{
        res.status(200).json({
            message:'Order deleted',
            request:{
                type: 'POST',
                url:'http://localhost:3000/orders/',
                body:{
                    productId:'ID',
                    quantity:'Number'
                } 
            }
        });
    });
}
exports.get_order = (req,res,next) => {
    Order.findById(req.params.orderId).exec().then(order => {
        if(!order) {
            return res.status(404).json({
                message: 'Order not found'
            })
        }
        
        res.status(200).json({
            order: order,
            request:{
                type: 'GET',
                url:'http://localhost:3000/orders/' 
            }
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
}