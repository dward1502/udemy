const mongoose = require('mongoose');


const ToDo =  mongoose.model("Todo",{
    text: {
        type:String,
        required: true,
        minlength:1,
        trim: true
    },
    completed:{
        type:Boolean,
        default: false
    },
    completedAt:{
        type:Number
    }
});

module.exports = {ToDo};