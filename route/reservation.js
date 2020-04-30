var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.get('/', function(req,res){
    res.render('tables-reservation');
});

router.get('/list', function(req,res){
  var array = [{'id': 1}, {'id': 2}]
  res.json(array);
});

module.exports = router;
