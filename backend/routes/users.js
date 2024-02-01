var express = require('express');
var router = express.Router();
var cors = require('cors');

router.use(cors());

let users = [
  {id: 1, name: "Oscar", email: "oscar@mail.com", password: "test"},
  {id: 2, name: "Janne", email: "janne@mail.com", password: "test"}
]

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res, next) {
  req.app.locals.db.collection('users')
  .find({}, {projection: {password: 0}}).toArray()
  .then(result => {
    res.json(result)
  })
  .catch(error => console.error(error, "Ett fel uppstod när alla användare skulle hämtas"))
});


module.exports = router;
