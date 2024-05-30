const axios = require('axios');

const Product = require('./models/ProductSchema');

// Fetch data from Faker API
async function fetchDataFromAPI() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        const products = response.data.data;
        // console.log(products);
        return products;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return [];
    }
}

// Save data to MongoDB
const saveDataToMongoDB = async () => {
    try {
        const products = await fetchDataFromAPI();

        // Save each product to MongoDB
        for (const productData of products) {
            // console.log(productData.images);
            // Create a new Product object using the provided data
            const product = new Product({
          
                name: productData.name,
                description: productData.description,
                ean: productData.ean,
                upc: productData.upc,
                image: productData.image,
                images: productData.images, // Extract image URLs from the array
                net_price: productData.net_price,
                taxes: productData.taxes,
                price: parseFloat(productData.price), // Convert price to a number
                categories: productData.categories,
                tags: productData.tags
            });

            // Save the product to MongoDB
            await product.save();
            console.log('Product saved to MongoDB:', product);
        }

        console.log('All products saved successfully.');
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
    }
}

// Call function to save data to MongoDB
module.exports = saveDataToMongoDB;
