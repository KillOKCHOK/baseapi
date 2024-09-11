var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registrattionRoute = require('./routes/registration');
var loginRoute = require('./routes/login');
var changepwdRoute = require('./routes/changepwd');
var profileRoute = require('./routes/profile');
const authenticateToken = require('./tools/jwtmiddleware');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registration', registrattionRoute);
app.use('/login', loginRoute);
app.use('/changepwd',authenticateToken, changepwdRoute);
app.use('/profile',authenticateToken, profileRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

let connection = require('./db/mongoconnection');

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
