var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

// Load environment variables from .env file in the project root directory
require("dotenv").config(); 

// Import database connection
require("./dao/db");

// Import custom error classes
const { NotFoundError, ForbiddenError, UnknownError } = require('./utils/ServiceError');

// Import admin route
var adminRouter = require('./routes/admin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to verify JWT token
app.use((req, res, next) => {
    if (req.path === '/api/admin/login') {
        return next();
    }

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(new ForbiddenError('No token provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new ForbiddenError('Failed to authenticate token'));
        }
        req.user = decoded;
        next();
    });
});

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
  res.json(err instanceof ServiceError ? err.toResponse() : new UnknownError().toResponse());
});

module.exports = app;
