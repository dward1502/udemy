const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        Type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Order', orderSchema);