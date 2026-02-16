var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Add CORS

require('dotenv').config(); // Load env variables
var { connectDB } = require('./utils/db');

// Connect to Database
connectDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products'); // Add products route

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Use CORS

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); // Mount products route

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler - return JSON instead of rendering view
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return JSON error response
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
