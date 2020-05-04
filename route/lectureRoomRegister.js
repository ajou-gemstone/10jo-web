var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");


router.post('/lectureRoomInfo',function(req, res) {
  console.log(req.body.buildingName);
  console.log(req.body.numberOfLectureRoom);
  console.log(req.body.numberOfPeople);
});
//강의실 등록정보 포스트로 받아옴


module.exports = router;
