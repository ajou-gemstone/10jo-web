var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");
var moment = require('moment');
var calculateTime = require('../utils/calculateTime');
var timeTable = require('../utils/timeTable');

router.get('/list', async function(req, res) {
  var date = req.query.date;
  var building = req.query.building;
  let recodes;
  var tableList = new Array();
  let jsonResult = new Array();
  let queryResult;
  let reservedRoomArray = new Array();
  let resultList;
  var stateList = new Array();

  date = date.split('-');
  date = moment([date[0], date[1] - 1, date[2]]).format("YYYY-MM-DD");

  let sql = `select lectureRoomId, lectureRoomNum, buildingName from lectureRoom where buildingName='${building}'`
  queryResult = await dbQuery(sql);
  queryResult = queryResult.rows;

  sql = `SELECT lectureroomdescription.TIME, lectureroomdescription.roomStatus, lectureRoom.lectureRoomId FROM lectureroom, lectureroomdescription WHERE lectureroom.buildingName='${building}' AND lectureroomdescription.date='${date}' AND lectureroom.id=lectureroomdescription.lectureRoomId`
  recodes = await dbQuery(sql);
  recodes = recodes.rows;

  var array = new Array();
  for (var j = 0; j < recodes.length; j++) {
    array.push(recodes[j]['lectureRoomId'])
    reservedRoomArray.push(recodes[j]['lectureRoomId'])
  }

  array = Array.from(new Set(array));

  for (var l = 0; l < array.length; l++) {
    var result = recodes.filter(function(recode) {
      return recode.lectureRoomId == array[l];
    });

    var sortingField = "TIME";

    result.sort(function(a, b) { // 오름차순
      return a[sortingField] - b[sortingField];
    });

    tableList = timeTable(result, date);

    resultList = {
      building: building,
      lectureroom: result[0].lectureRoomId,
      lectureRoomNum: queryResult[l].lectureRoomNum,
      stateList: tableList
    }

    jsonResult.push(resultList);
  }

reservedRoomArray = Array.from(new Set(reservedRoomArray));

for (var i = 0; i < queryResult.length; i++) {
  if (reservedRoomArray.indexOf(array[i]) == -1) {
    for (var j = 0; j <= 27; j++) {
      stateList.push('A');
    }
    resultList = {
      building: building,
      lectureroom: queryResult[i].lectureRoomId,
      lectureRoomNum: queryResult[l].lectureRoomNum,
      stateList: stateList
    }
    jsonResult.push(resultList);
  }
}

res.json(jsonResult);
});

router.post('/reservationSearch',function(req, res) {
  console.log(req.body.buildingName);
  console.log(req.body.date);
});



module.exports = router;
