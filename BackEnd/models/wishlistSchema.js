const mongoose = require('mongoose');
const { Schema } = mongoose;
// const productSchema = new mongoose.Schema({
//     id: Number,
//     name: String,
//     description: String,
//     ean: String,
//     upc: String,
//     image: String,
//     images: {
//         title: String,
//         description: String,
//         url: String
//     },
//     net_price: Number,
//     taxes: Number,
//     price: Number,
//     categories: [{ type: Number }],
//     tags: [{ type: String }]
// });

const containerSchema = new mongoose.Schema({
    data_ID: String,
    quantity: Number
});
const WishListScehma = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_obj'
    },
    Data: [containerSchema],
});

module.exports = mongoose.model('WishList_Obj', WishListScehma)