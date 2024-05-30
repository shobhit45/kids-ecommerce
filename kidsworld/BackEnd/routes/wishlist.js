const Express = require("express");
const router = Express.Router();
const fetchUSER = require('../Middleware/FtechUsers');
const mongoose = require('mongoose');
const WishList = require("../models/wishlistSchema")
const { body, validationResult } = require('express-validator');


router.get('/getWishList', fetchUSER,
    async (req, res) => {
        console.log("/user/wishlist claled with id", req.user.id);
        try {
            const userId = req.user.id;

            let wishList = await WishList.findOne({ user: userId });
            console.log(wishList);
            if (wishList) {
                res.status(200).send(wishList)

            }
            else {
                let new_wishList = new WishList({
                    user: userId,
                    Data: []
                });
                res.status(200).send(new_wishList); 

            }
        } catch (err) {
            res.status(404).json(
                {
                    "Error occouured !! ": err
                }
            );
        }

    }
)


router.post('/CreateWishlist', fetchUSER, async (req, res) => {
    try {
        // Extracting data from request body
        const { dataId, quantity } = req.body;

        const userId = req.user.id;

        // Check if the user already has a wishlist
        let wishList = await WishList.findOne({ user: userId });

        console.log(userId, quantity, dataId);
        if (!wishList && quantity > 0) {

            // --for new user
            wishList = new WishList({
                user: userId,
                Data: [{ data_ID: dataId, quantity: quantity }]
            });
        } else {

            const existingDataIndex = wishList.Data.findIndex(data => data.data_ID === (dataId));

            console.log("existing data index ", existingDataIndex);
            if (existingDataIndex !== -1) {

                if (quantity !== 0) {
                    wishList.Data[existingDataIndex].quantity = quantity;
                } else {
                    // 0 - means hata do -----
                    wishList.Data.splice(existingDataIndex, 1);
                }
            } else {
                // not present in the array
                wishList.Data.push({ data_ID: dataId, quantity: quantity });
            }
        }

        // Saving the updated wishlist to MongoDB
        await wishList.save();

        res.status(201).json({ message: 'Data inserted/updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

