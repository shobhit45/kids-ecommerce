const Express = require("express");
const router = Express.Router();
const fetchUSER = require("../Middleware/FtechUsers");
// const compData = require("../models/compSchema");
const prod_Data = require("../models/ProductSchema");
// const WishListData = require("../models/wishlistSchema")
const { body, validationResult } = require("express-validator");

router.get("/getProducts", async (req, res) => {
  try {
    const allData = await prod_Data.find();
    res.send(allData);
  } catch (err) {
    // console.log(err.message);
    res.status(404).json({
      "Error occouured !! ": err,
    });
  }
});

router.post("/setProduct", async (req, res) => {
  try {
    // Extracting data from the request body
    const { category, description,  image, price, rating, title } = req.body;

    // Creating a new product document
    let  newProduct =await prod_Data.create({
      category,
      description,
      image,
      price,
      rating,
      title,
    });

    // Saving the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Responding with the saved product data
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to save product" });
  }
});

router.get("/getProduct/:id", async (req, res) => {
  try {
    const productData = await prod_Data.findOne({ _id: req.params.id });
    if (!productData) return res.status(400).send("Invalid link--");

    res.send(productData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

module.exports = router;
