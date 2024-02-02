var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

const UserModel = require('../models/user-models');
const bcrypt = require('bcrypt');


// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', async function(req, res) {
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
    const foundUser = await UserModel.findOne({ _id: req.body.id });

    res.status(200).json(foundUser);
  } catch (error) {
    console.error("Error while getting user with id", error);
  }
});

// SKAPA USER
router.post('/add', async function(req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error('Error while create new user', error)
  }
});

// LOGGA IN USER // VID FEL LÖSENORD SÅ SKALL SVARA MED 401
router.post('/login', async function(req, res, next) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).send({ message: "No user found" })
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json(user.id);
    } else {
      res.status(401).send({ message: "Wrong password" })
    }
  } catch (error) {
    console.error("Error while log in", error);
  }
});

module.exports = router;
