var express = require('express');
var router = express.Router();
const CategoryModel = require('../models/category-models');
require('dotenv').config();
const cors = require('cors');
router.use(cors());

router.get('/', async function (req, res) {
    try {
        const categories = await CategoryModel.find();

        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
    }
});

// SKAPA KATEGORI, KEY MÅSTE ANGES // UTAN KEY SVARA 401
router.post('/add', async function (req, res) {
    try {
        if (req.body.token === process.env.ACCESS_KEY) {
            const newCategory = await CategoryModel.create({ name: req.body.name });

            res.status(200).json({ message: 'Category created', newCategory});
        } else {
            res.status(401).json({message: 'Couldnt create category'});
        }
    } catch (error) {  
        console.error('Error while creating new category', error);
    }
});

module.exports = router; 