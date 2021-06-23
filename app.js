var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();


var indexRouter = require('./routes/index');
var yesRouter = require('./routes/yes')
var clientsRouter = require('./routes/clients')
var apiRouter = require('./routes/api')
var trollRouter = require('./routes/trollcrazy')
var uwuRouter = require('./routes/apiEndpoints/uwu')
var urlRouter = require('./routes/apiEndpoints/url')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/catgirl', catgirlRouter);
app.use('/api/uwu', uwuRouter);
app.use('/yes', yesRouter);
app.use('/clients', clientsRouter);
app.use('/api', apiRouter);
app.use('/trollcrazy', trollRouter);
app.use('/', urlRouter);
//app.use('/api/capes', capesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
