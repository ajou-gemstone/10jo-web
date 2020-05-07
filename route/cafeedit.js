var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");
//카페 정보수정 페이지(카페사장전용)
router.post('/cafeeditinfo',function(req, res) {
  console.log(req.body.cafeName);//카페 이름
  console.log(req.body.telephoneNumber);// 전화 번호
  console.log(req.body.state);//1~5까지의 혼잡도
});


module.exports = router;
