var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.post('/registerInfo',function(req, res) {
  console.log(req.body.cafeAdminId);
  console.log(req.body.cafeAdminPw);
  console.log(req.body.cafeName);
  console.log(req.body.address);    
  console.log(req.body.zonecode);
  console.log(req.body.address_etc);
  console.log(req.body.cafeTel);  
});

module.exports = router;
