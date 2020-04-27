var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.get('/', function(req, res) {
});

router.post('/', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  console.log(email);

  if(email==1&&password==1){
    res.render('index', {id:1});
  }
  else{
    res.render('index', {id:2});
  }
});

module.exports = router;
