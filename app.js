require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('express-async-errors');

var indexRouter = require('./routes/index');
var vManageRouter = require('./routes/vManageRoutes');
var vSearchRouter = require('./routes/vSearchRoutes');
var cManageRouter = require('./routes/cManageRoutes');
var bManageRouter = require('./routes/bManageRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Connecting to Mongodb
const db = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://VMS:${process.env.DB_PASS}@cluster0.wtxu99s.mongodb.net/vRent`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected");

  } catch (err) {
    console.log("MongoDB Error : Failed to connect");
    console.log(err);
    process.exit(1);
  }
}

db();

app.use('/', indexRouter);
app.use('/vManage', vManageRouter);
app.use('/cManage', cManageRouter);
app.use('/bManage', bManageRouter);
app.use('/vSearch', vSearchRouter);

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
  // res.render('error');
  res.json({ error: err.message });
});

module.exports = app;
