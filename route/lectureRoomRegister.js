var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.get('/', function(req, res) {
  res.render('register-lectureroom');
});



module.exports = router;
