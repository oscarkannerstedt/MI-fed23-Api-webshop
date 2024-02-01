var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const MongoClient = require('mongodb').MongoClient;

var app = express();

MongoClient.connect('mongodb://127.0.0.1:27017', {
  useUnifiedTopology: true
})
  .then(client => {
    console.log("Ansluten till databasen");
    const db = client.db("Oscar-Kannerstedt");
    app.locals.db = db;
  })
  .catch(err => console.error("Ingen kontakt med databasen", err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

module.exports = app;
