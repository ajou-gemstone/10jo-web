var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");
var calculateTime = require('../utils/calculateTime');

router.post('/create', async function(req, res, next) {
  var timeList = req.body.timeList;
  var buildingName = req.body.buildingName;
  var lectureName = req.body.lectureName;
  var professorName = req.body.professorName;
  var lectureRoomNum = req.body.lectureRoomNum;
  var lectureCode = req.body.lectureCode;
  var num;
  var lectureRoom = buildingName[0]+lectureRoomNum;
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();

  if((day+"").length<2){
    day = "0" + day;
  }

  year = year.toString();
  month = month.toString();
  day = day.toString();

  date = year+"-"+month+"-"+day;

  // let sql = 'select max(id) as num from lecture';
  // var queryResult = await dbQuery(sql);
  //
  // queryResult = queryResult.rows;
  //
  // num = queryResult[0]['num'];
  // num = num + 1;

  // sql = `insert into lecture(id, lectureName, professorName, taName, lectureCode) values(${num}, '${lectureName}', '${professorName}', null, '${lectureCode}')`
  // recodes = await dbQuery(sql);
  let sql = `select id from lecture where lectureName='${lectureName}'`;
  let recodes = await dbQuery(sql);
  recodes = recodes.rows;
  var id = recodes[0].id;

  sql = `select id from lectureroom where lectureRoomId='${lectureRoom}'`;
  recodes = await dbQuery(sql);
  recodes = recodes.rows;
  var lectureRoomId = recodes[0].id;

  for(var i=0;i<timeList.length;i++){
    for(var j=timeList[i].startTime;j<=timeList[i].lastTime;j++){
      sql = `insert into lectureroomdescription(lectureId, lectureRoomId, lectureTime, time, semester, roomStatus, date, day) values(${id}, '${lectureRoomId}', 0, '${j}', '2020-1', 'L', '${date}', '${timeList[i].day}')`
      recodes = await dbQuery(sql);
    }
  }

  res.json({
    response: 'success'
  });
});

module.exports = router;