var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

const UserModel = require('../models/user-models')


// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', async function(req, res, next) {
  try {
    const users = await UserModel.find({}, 'name email');

    res.status(200).json(users);
  } catch (error) {
    console.error("Error while getting users", error);
  }
});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', async function(req, res) {
  try {
    const foundUser = await UserModel.findOne({_id: req.body.id});

    res.status(200).json(foundUser);
  } catch (error) {
    console.error("Error while getting user with id", error);
  }
});

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
