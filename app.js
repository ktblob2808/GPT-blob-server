var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressJWT = require("express-jwt");
var session = require('express-session');
const md5 = require('md5');
const { ForbiddenError, ServiceError, UnknownError } = require('./utils/ServiceError');

// Load environment variables from .env file in the project root directory
require("dotenv").config(); 

// Import database connection
require("./dao/db");

// Import custom error classes

// Import routes
var adminRouter = require('./routes/admin');
var captchaRouter = require('./routes/captcha');
var bannerRouter = require('./routes/bannerRoute');
var uploadRouter = require('./routes/uploadRoute');
var blogTypeRouter = require('./routes/blogType');
var blogRouter = require('./routes/blog'); // Add blog route

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session handling
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to verify JWT token
app.use(expressJWT({
  secret : md5(process.env.JWT_SECRET), 
  algorithms : ['HS256'], 
}).unless({
  path : [
    {"url" : "/api/admin/login", methods : ["POST"]},
    {"url" : "/api/admin", methods : ["PUT"]},
    {"url" : "/res/captcha", methods : ["GET"]}
  ]
}))

app.use('/api/admin', adminRouter);
app.use('/res', captchaRouter);
app.use('/api', bannerRouter);
app.use('/api', uploadRouter);
app.use('/api', blogTypeRouter);
app.use('/api', blogRouter); // Use blog route

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new NotFoundError());
});

// error handler
app.use(function(err, req, res, next) {
  console.log("err.name>>>",err.name);
  console.log("err.message>>>",err.message);
  if (err.name === 'UnauthorizedError') {
    res.send(new ForbiddenError("login fail, Or login expired").toResponse());
  } else if(err instanceof ServiceError){
    res.send(err.toResponse());
  } else {
    res.send(new UnknownError().toResponse());
  }
});

module.exports = app;
