var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
           res.render('index', {
                      title: 'MEAN Programming Exercise'
                      });
           });
/* Draw chart- page. */
router.get('/graph/draw/:IdVal', function(req, res) {
           res.render('display', {
                      title: 'MEAN Programming Exercise'
                      });
           });
/* GET data for _id service */
router.get('/graph/get/:IdVal', function(req, res) {
           var db = req.db;
           var mongo = require('mongodb');
           var o_id = new mongo.ObjectID(req.param('IdVal'));
           var collection1 = db.get('dataetc');
           console.log(o_id);
           collection1.find({
                            '_id': o_id
                            }, {}, function(e, docs) {
                            res.json(docs);
                            res.render('/', {
                                       title: 'Hello'
                                       })
                            });
           });
/* GET _id list service */
router.get('/graph/id_list', function(req, res) {
           var db = req.db;
           var collection2 = db.get('dataetc');
           console.log('Fetching list..');
           collection2.distinct("_id", function(err, result) {
                                console.log(result);
                                res.json(result);
                                });
           });
/* POST to Graph Save Service */
router.post('/graph/save', function(req, res) {
            // Set our internal DB variable
            var db = req.db;
            // Get our form values.
            var chartType = req.body.chart_type;
            var dataMin = req.body.data_min;
            var dataMax = req.body.data_max;
            var title = req.body.title;
            // Set our collection
            var collection = db.get('dataetc');
            //Set series randomly (Can be more robust than this, but since only to represent, trying)
            var a = [{
                     'data': [['2012-10-8', 0.02], ['2005-9-6', 3.59], [
                                                                        '2014-3-22', 4.70], ['2011-9-15', 1.92], [
                                                                                                                  '2003-9-20', 4.60], ['2003-12-24', 3.64], [
                                                                                                                                                             '2004-9-27', 2.06], ['2014-10-25', 0.25], [
                                                                                                                                                                                                        '2011-4-22', 2.86], ['2006-2-3', 2.75]],
                     'pointInterval': 24 * 60 * 60 * 1000 * 30
                     }];
            var b = [{
                     'data': [['2010-10-8', 0.42], ['2009-9-6', 3.09], [
                                                                        '2008-3-22', 2.70], ['2007-9-15', 1.82], [
                                                                                                                  '2006-9-20', 2.87], ['2005-12-24', 3.04], [
                                                                                                                                                             '2008-9-27', 8.06], ['2003-10-25', 4.25], [
                                                                                                                                                                                                        '2002-4-22', 3.86], ['2001-2-3', 1.78]]
                     }];
            var c = [{
                     'data': [['2010-1-8', 1.87], ['2010-2-6', 2.59], [
                                                                       '2010-3-22', 2.22], ['2010-4-15', 3.12], [
                                                                                                                 '2010-5-20', 2.67], ['2010-6-24', 1.56], [
                                                                                                                                                           '2010-7-27', 3.86], ['2010-8-25', 2.05], [
                                                                                                                                                                                                     '2010-9-22', 0.86], ['2010-10-3', 2.55]]
                     }];
            var d = [{
                     'data': [['2014-10-8', 3.02], ['2014-10-9', 2.29], [
                                                                         '2014-10-10', 4.70], ['2014-10-11', 1.22], [
                                                                                                                     '2014-10-12', 2.79], ['2014-10-13', 3.04], [
                                                                                                                                                                 '2014-10-14', 3.56], ['2014-10-15', 4.01], [
                                                                                                                                                                                                             '2014-10-16', 3.96], ['2014-10-17', 0.75]]
                     }];
            var e = [{
                     'data': [['2002-11-22', 3.02], ['2002-11-23', 1.59], [
                                                                           '2002-11-24', 1.70], ['2002-11-25', 2.22], [
                                                                                                                       '2002-11-26', 1.60], ['2002-11-27', 1.64], [
                                                                                                                                                                   '2002-11-28', 2.56], ['2002-11-29', 3.25], [
                                                                                                                                                                                                               '2002-11-30', 3.86], ['2002-12-1', 3.75]]
                     }];
            var f = [{
                     'data': [['2007-2-8', 2.44], ['2007-2-9', 2.49], [
                                                                       '2007-2-10', 3.20], ['2007-2-11', 2.92], [
                                                                                                                 '2007-2-12', 2.40], ['2007-2-13', 3.14], [
                                                                                                                                                           '2007-2-14', 2.86], ['2007-2-15', 3.15], [
                                                                                                                                                                                                     '2007-2-16', 2.26], ['2007-2-17', 2.98]]
                     }];
            var g = [{
                     'data': [['2005-6-28', 2.74], ['2005-6-29', 2.91], [
                                                                         '2005-6-30', 2.70], ['2005-7-1', 2.87], [
                                                                                                                  '2005-7-2', 3.11], ['2005-7-3', 3.21], [
                                                                                                                                                          '2005-7-4', 2.96], ['2005-7-5', 3.25], [
                                                                                                                                                                                                  '2005-7-6', 2.89], ['2005-7-7', 2.95]]
                     }];
            var rand = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
            var x = eval(rand[Math.floor(Math.random() * rand.length)]);
            // Submit to the DB
            collection.insert({
                              "chart_type": chartType,
                              "data_min": dataMin,
                              "data_max": dataMax,
                              "data": (x),
                              "title": title,
                              }, function(err, doc) {
                              if (err) {
                              // If it failed, return error
                              res.send(
                                       "There was a problem adding the information to the database."
                                       );
                              } else {
                              // And forward to success page
                              console.log(doc._id);
                              res.redirect("/graph/draw/" + doc._id);
                              }
                              });
            });
module.exports = router;