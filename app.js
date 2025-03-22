var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressJWT = require("express-jwt");
const md5 = require('md5');
const { NotFoundError, ForbiddenError, UnknownError } = require('./utils/ServiceError');


// Load environment variables from .env file in the project root directory
require("dotenv").config(); 

// Import database connection
require("./dao/db");

// Import custom error classes

// Import admin route
var adminRouter = require('./routes/admin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to verify JWT token
app.use(expressJWT({
  secret : md5(process.env.JWT_SECRET), 
  algorithms : ['HS256'], 
}).unless({
  path : [
    {"url" : "/api/admin/login", methods : ["POST"]}
  ]
}))

app.use('/api/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new NotFoundError());
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(new ForbiddenError("login fail").toResponse());
});

module.exports = app;
