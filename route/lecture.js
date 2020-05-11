var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");
var calculateTime = require('../utils/calculateTime');

router.post('/create', async function(req, res, next) {
  var day = req.body.day;
  var time = req.body.time;
  var buildingName = req.body.buildingName;
  var lectureName = req.body.lectureName;
  var professorName = req.body.professorName;
  var lectureRoomNum = req.body.lectureRoomNum;
  var lectureCode = req.body.lectureCode;
  var num;
  var lectureRoom = buildingName[0]+lectureRoomNum;
  var date = new Date();

  let sql = 'select count(*) as num from lectureRoom';
  var queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  num = queryResult[0]['num'];
  num = num + 1;

  sql = `insert into lecture(id, lectureName, professorName, taName, lectureCode) values(${num}, '${lectureName}', '${professorName}', null, '${lectureCode}')`
  recodes = await dbQuery(sql);

  for(var i=0;i<time.length;i++){
    for(var j=0;j<day.length;j++){
      day[j] = calculateTime(day[j]);
      sql = `insert into lectureroomdescription(lectureId, lectureRoomId, lectureTime, time, semester, roomStatus, date, day) values(${num}, '${lectureRoom}', '${time[i]}', '2020-1', 'L', '${date}', '${day[j]}')`
      recodes = await dbQuery(sql);
    }
  }

  res.json({
    response: 'success'
  });
});

module.exports = router;
