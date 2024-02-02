var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

const MongoClient = require('mongodb').MongoClient;

var app = express();

// MongoClient.connect('mongodb://127.0.0.1:27017', {
//   useUnifiedTopology: true
// })
//   .then(client => {
//     console.log("Ansluten till databasen");
//     const db = client.db("Oscar-Kannerstedt");
//     app.locals.db = db;
//   })
//   .catch(err => console.error("Ingen kontakt med databasen", err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

async function init() {
  try {
    const options = { useUnifiedTopology: true, useNewUrlParser: true };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('Vi är uppkopplade mot databasen!');
  } catch (error) {
    console.error(error);
  }
}

init();


module.exports = app;
