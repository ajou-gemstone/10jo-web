var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");
var calculateTime = require('../utils/calculateTime');

router.get('/list', async function(req, res, next) {
  var timeList = new Array();

  let sql = 'select * from lecture where id!=0';
  var queryResult = await dbQuery(sql);
  queryResult = queryResult.rows;

  for(var i=0;i<queryResult.length;i++){
    sql = `select lectureroom.lectureRoomId, lectureroomdescription.time, lectureroomdescription.day from lectureroom, lectureroomdescription where lectureroom.id=lectureroomdescription.lectureRoomId and lectureroomdescription.lectureId=${queryResult[i].id}`;
    var query = await dbQuery(sql);
    query = query.rows;

    if(query.length!=0){
      for(var j=0;j<query.length;j++){
        timeList.push(query[j].day+query[j].time);
      }

      queryResult[i].timeList=timeList;
      queryResult[i].lectureRoomId=query[0].lectureRoomId;
    }
    else{
      queryResult[i].timeList=[];
      queryResult[i].lectureRoomId="";
    }

    timeList = [];

    delete queryResult[i].taName;
  }

  res.json(queryResult);
});

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
  let sql = `select id from lecture where lectureName='${lectureName}' and lectureCode='${lectureCode}'`;
  let recodes = await dbQuery(sql);
  recodes = recodes.rows;
  var id = recodes[0].id;

  sql = `select id from lectureroom where lectureRoomId='${lectureRoom}'`;
  recodes = await dbQuery(sql);
  recodes = recodes.rows;
  var lectureRoomId = recodes[0].id;

  sql = `select * from lectureroomdescription where lectureId='${id}'`;
  let query = await dbQuery(sql);
  query = query.rows;

  timeList[0].startTime = parseInt(timeList[0].startTime);
  timeList[0].lastTime = parseInt(timeList[0].lastTime);

  if(query.length==0){
    for(var i=0;i<timeList.length;i++){
      for(var j=timeList[i].startTime;j<timeList[i].lastTime;j++){
        sql = `insert into lectureroomdescription(lectureId, lectureRoomId, lectureTime, time, semester, roomStatus, date, day, reservationId) values(${id}, '${lectureRoomId}', 0, '${j}', '2020-1', 'L', '${date}', '${timeList[i].day}', 0)`
        recodes = await dbQuery(sql);
      }
    }

    console.log('success');
    res.json({
      response: 'success'
    });
  }

  else{
    res.json({
      response: '중복'
    });
  }


});

module.exports = router;