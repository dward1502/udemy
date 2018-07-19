const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get_products = (req,res,next)=>{
    Product.find().exec().then( docs =>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
exports.create_product = (req,res,next)=>{
    const product = new Product({
        _id = new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message:'Handling POST requests to /products',
            createdProduct: result
        });
    }).catch(err => console.log(err));
        console.log(err);
        res.status(500).json({
            message:'Handling POST requests to /products',
            error: err
        });
}
exports.get_product = (req,res,next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then( doc => {
        console.log(doc);
        res.status(200).json({
            message: 'Updated product!',
            doc: doc
        });
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });    
}
exports.update_product = (req, res,next ) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]= ops.value;
    }
    Product.update({_id: id}, {$set:updateOps}).exec().then( result => {
        console.log(result);
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
exports.delete_product = (req,res,next) => {
    const id = req.params.productId;
    Product.remove({_id: id}).exec().then( result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })  
    });
}