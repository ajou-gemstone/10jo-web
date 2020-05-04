var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.post('/classInfo',function(req, res) {
  console.log(req.body.buildingName);
  console.log(req.body.numberOfLectureRoom);
  console.log(req.body.schedule);
});

module.exports = router;
