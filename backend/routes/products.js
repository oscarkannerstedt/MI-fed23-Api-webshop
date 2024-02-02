var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-models');

require('dotenv').config();
const cors = require('cors');
router.use(cors());


// HÄMTA ALLA PRODUKTER
router.get('/', async function(req, res, next) {
    try {
        const products = await ProductModel.find(
            {},
            'name description price lager category'
        ).populate('category');

        res.status(200).json(products);
    } catch (error) {
        console.error("Error while getting products", error);
    }
});

// HÄMTA SPECIFIK PRODUKT
router.get('/:id', function(req, res, next) {
    try {
        
    } catch (error) {
        console.error("Error while getting product with id", error);
    }
})

// SKAPA PRODUKT
router.post('/add', function(req,res,next) {
    try {
        const newProduct = req.body;
        req.app.locals.db.collection('products').insertOne(newProduct)
        res.status(200).json(newProduct);
    } catch (error) {
        console.error("Error while creating new product", error);
    }
});





module.exports = router;