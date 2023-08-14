/* eslint-disable */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

const cors = require('cors');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB connected :)');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/api', indexRouter);

app.get('/', (req, res) => {
  res.redirect('/api');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const error = {
    status: err.status || 500,
    stack: err.stack || 'Error stack trace...',
  };

  // render the error page
  res.status(error.status);
  res.render('error', {message: err.message, error, title: 'Error Page'});
});

module.exports = app;
