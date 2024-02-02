var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');


// HÄMTA ALLA PRODUKTER
router.get('/', function(req,res,next) {
    try {
        req.app.locals.db.collection('products').find().toArray()
        .then(result => {
            res.status(200).json(result);
        })
    } catch (error) {
        console.error("Error while getting products", error);
    }
});

// HÄMTA SPECIFIK PRODUKT
router.get('/:id', function(req, res, next) {
    try {
        req.app.locals.db.collection('products').findOne({'_id': new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
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