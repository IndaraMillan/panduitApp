'use strict';  //this means that all variables must being declare, if not, the code will show an error

var express = require('express');                   
var path = require('path');
var favicon = require('serve-favicon');             
var logger = require('morgan');                     
var cookieParser = require('cookie-parser');        
var bodyParser = require('body-parser');            
var jwt = require('jsonwebtoken');                  
var moment = require('moment');
var moment = require('moment-timezone');
var app = express();                                


var secret = 'panduitapisec';



app.use(logger('dev'));                            
app.use(cookieParser());                            
app.use(bodyParser.json());                         //this is use for "verify" function-- to be able to work it has to be on this structure
app.use(favicon(__dirname + '/favicon.ico'));       //search for directory where favicon is located
app.use(bodyParser.urlencoded({ extended: true })); //we use again bodyParser to get urlencoded 



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/login', require('./routes/login'));    //ROUTE

app.all('/api/:token/*', function(req, res, next) {  
  var token = req.params.token;
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {      
			if (err) { 
				return res.sendStatus(401);
			} else {
				req.decoded = decoded;      //decoded token
				next();
			}
		});
  } else {
		return res.sendStatus(401);  //in case something goes wrong
	}
});

app.use('/api/:token/users', require('./routes/users'));
app.use('/api/:token/inputpoints', require('./routes/inputpoints'));
app.use('/api/:token/addPoints', require('./routes/addPoints'));
app.use('/api/readMessage', require('./routes/readMessage'));
app.use('/api/:token/putMessage', require('./routes/putMessage'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); 

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
    title: 'error'
  });
});

//test
app.use('/panduit/performance.html',function(req, res, next) {
  console.log('test: ', req.post)
  next();
}); 


module.exports = app;  //we export information of app