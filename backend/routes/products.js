var express = require('express');
var router = express.Router();


// HÄMTA ALLA PRODUKTER
router.get('/', function(req,res,next) {
    try {
        req.app.locals.db.collection('products').find().toArray()
        .then(result => {
            res.status(200).json(result);
        })
    } catch (error) {
        console.error("Error while getting products");
    }
});





module.exports = router;