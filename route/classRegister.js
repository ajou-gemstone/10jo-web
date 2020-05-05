var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.post('/classInfo',function(req, res) {
  console.log(req.body.schedule1);
  console.log(req.body.timeOfClass1);
  console.log(req.body.schedule2);
  console.log(req.body.timeOfClass2);    
  console.log(req.body.buildingName);
  console.log(req.body.numberOfLectureRoom);
  console.log(req.body.professor);
  console.log(req.body.subjectCode); 
});
//이거 수업등록인데 

module.exports = router;
