
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var routes = require('./routes/index');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*
'use strict';




myapp.controller('myctrl', function ($scope) {
                 

                 //Enforcing datetime
                 
                 var keys = new Array;
                 var vals = new Array;
                 
                 for (var key in x.data) {
                 if (x.data.hasOwnProperty(key)) {
                 var y = x.data[key];
                 y=y.toString();
                 y = y.split('-');
                 var temp = y[0]+','+ y[1]+','+ y[2]
                 x.data[key] = Date.UTC(temp);
                 
                 vals.push(dataObject[key]);
                 keys.push(key);
                 
                 }
                 }
                 
                 
                 $scope.chartSeries = [x];
                 
                 $scope.chartConfig = {
                 options: {
                 chart: {
                 type: 'line'
                 },
                 plotOptions: {
                 series: {
                 stacking: ''
                 
                 }
                 }
                 },
                 series: $scope.chartSeries,
                 title: {
                 text: 'Hello'
                 },
                 credits: {
                 enabled: false
                 },
                 xAxis: {
                 min: Math.min(keys),
                 //max: Math.max(keys),
                 //type: 'datetime',
                 //labels: {},
                 pointStart:2000,
                 pointEnd: 2016,
                 categories: keys
                 },
                 yAxis: {
                 type: 'number',
                 currentMin: 0,
                 currentMax: 7
                 },
                 
                 title: {
                 text: 'Date'
                 },
                 loading: false,
                 size: {}
                 }
                 
                 $scope.reflow = function () {
                 $scope.$broadcast('highchartsng.reflow');
                 };
                 
                 
                 });
*/

module.exports = app;

