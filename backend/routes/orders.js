var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();


// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post('/add', async function(req, res) {
    try {
        const {user, products} = req.body;

        const userExists = await req.app.locals.db.collection('users').findOne({'_id': new ObjectId(req.body.user)});
        if (!userExists) {
            return res.status(404).json({error: 'User not found'})
        }

        const productIds = products.map(product => product);
        await req.app.locals.db.collection('products').findOne({_id: {$in: productIds}});
        
        const newOrder = {
            user,
            products
        };

        await req.app.locals.db.collection("orders").insertOne(newOrder);
        res.status(200).json(newOrder);
    } catch (error) {
        console.error('Error while creating order', error);
    }
});

// HÄMTA ALLA ORDERS
router.get('/all', function(req, res) {
    try {
        req.app.locals.db.collection('orders').find().toArray()
        .then(result => {
            res.status(200).json(result);
        })
    } catch (error) {
        console.error("error while getting orders", error);
    }
});






module.exports = router;