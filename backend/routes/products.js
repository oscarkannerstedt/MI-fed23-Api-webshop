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
router.get('/:id', async function(req, res, next) {
    try {
        const product = await ProductModel.findById(
            {_id: req.params.id},
            '_id name description lager price'
        );

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(400).json('No product found');
        }
    } catch (error) {
        console.error("Error while getting product with id", error);
    }
});

// SKAPA PRODUKT // UTAN TOKEN SÅ SKALL ANROPET MISSLYCKAS = 401
router.post('/add', async function(req,res,next) {
    try {
        if (req.body.token === process.env.ACCESS_KEY) {
            const newProduct = await ProductModel.create(req.body);

            res.status(200).json({
                _id: newProduct._id,
                name: newProduct.name,
                category: newProduct.category,
                lager: newProduct.lager,
                price: newProduct.price,
            });
        } else {
            res.status(401).json('Invalid token')
        }
    } catch (error) {
        console.error("Error while creating new product", error);
    }
});

// HÄMTA ALLA PRODUKTER FÖR EN SPECIFIK KATEGORI
router.get('/category/:id', async function (req, res, next) {
    try {
        const foundProducts = await ProductModel.find(
            {
                category: req.params.id,
            },
            'name category description lager price'  
        ).populate('category');

        if (foundProducts) {
            res.status(200).json(foundProducts);
        } else {
            res.status(404).json({ message: 'No products found in that category' });
        }

    } catch (error) {
        console.error('Error while getting products', error);
    }
});


module.exports = router;