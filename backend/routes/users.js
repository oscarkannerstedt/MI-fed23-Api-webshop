var express = require('express');
var router = express.Router();
var cors = require('cors');
const { ObjectId } = require('mongodb');

router.use(cors());


// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res, next) {
  try {
    req.app.locals.db.collection('users')
    .find({}, {projection: {password: 0}}).toArray()
    .then(result => {
      res.status(200).json(result)
    })
  } catch (error) {
    console.error("Error while getting users", error);
  }
});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', function(req, res, next) {
  try {
    req.app.locals.db.collection('users').findOne({"_id": new ObjectId(req.body.id)})
    .then(result => {
      res.status(200).json(result)
    })
  } catch (error) {
    console.error("Error while getting user with id", error);
  }
})

// SKAPA USER
router.post('/add', function(req, res, next) {
  try {
    const newUser = req.body;
    req.app.locals.db.collection('users').insertOne(newUser)
    res.status(200).json(newUser);
  } catch (error) {
    console.error('Error while create new user', error)
  }
});

// LOGGA IN USER
router.post('/login', function(req, res, next) {
  try {
    let checkEmail = req.body.email;
    let checkPassword = req.body.password;
    req.app.locals.db.collection('users').findOne({"email": checkEmail, "password": checkPassword})
    .then(result => {
      if (result) {
        res.status(200).send({message: "Logged in"});
      } else {
        res.status(401).send({message: "Wrong email or password"});
      }
    })
    
    
  } catch (error) {
    console.error("Error while log in", error);
  }
});

module.exports = router;
