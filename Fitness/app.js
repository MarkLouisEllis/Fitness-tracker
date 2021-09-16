var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const helmet = require("helmet");

//import routes
const activityRoutes = require('./routes/activity')
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');


var mongoose = require('mongoose');

//mongoose connection config
const uri = 'mongodb+srv://Mark_Ellis:Mark@mark-hyperion-dev.xejtd.mongodb.net/capstone?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
	
});

mongoose.connection.on('error', function() {
	console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middlewear
app.use(cors());
app.use(morgan('dev'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//Routes
app.use('/activity', activityRoutes);
app.use('/api', authRoutes);
app.use('/admin', adminRoutes);

//React build assests
if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
  'frontend', 'build','index.html'));
  });
  }



// catch 404 and forward to error handler;
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//listening on PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


module.exports = app;
