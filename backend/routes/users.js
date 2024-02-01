var express = require('express');
var router = express.Router();
var cors = require('cors');

router.use(cors());


// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res, next) {
  req.app.locals.db.collection('users')
  .find({}, {projection: {password: 0}}).toArray()
  .then(result => {
    res.json(result)
  })
  .catch(error => console.error(error, "Ett fel uppstod när alla användare skulle hämtas"))
});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET


// SKAPA USER
router.post('/add', function(req, res, next) {
  const newUser = req.body;
  req.app.locals.db.collection('users').insertOne(newUser)
  res.send("Användare tillagd");
});


module.exports = router;
