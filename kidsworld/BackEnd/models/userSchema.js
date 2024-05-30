const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    verfied: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true

    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('user_obj', userSchema)

//***  here user_obj is the collection name where this data is  going to be stored 