var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");
var moment = require('moment');
var calculateTime = require('../utils/calculateTime');
var timeTable = require('../utils/timeTable');

router.get('/lectureRoomSearch', async function(req, res) {
  var date;
  var building = req.query.id2;
  let recodes;
  var tableList = new Array();
  let jsonResult = new Array();
  let queryResult;
  let reservedRoomArray = new Array();
  let resultList;
  var stateList = new Array();
  var resultArray = new Array();
  date = req.query.id;
  date = date.split('-');
  date = moment([date[0], date[1] - 1, date[2]]).format("YYYY-MM-DD");

  let sql = `select buildingName, lectureRoomId, lectureRoomNum, buildingName from lectureRoom where buildingName='${building}'`
  queryResult = await dbQuery(sql);
  queryResult = queryResult.rows;

  var day = calculateTime(date);

  sql = `SELECT lectureroomdescription.TIME, lectureroomdescription.roomStatus, lectureRoom.lectureRoomId FROM lectureroom, lectureroomdescription WHERE lectureroom.buildingName='${building}' AND (lectureroomdescription.day='${day}' and lectureroomdescription.roomStatus='L') AND lectureroom.id=lectureroomdescription.lectureRoomId`
  recodes = await dbQuery(sql);
  recodes = recodes.rows;

  for (var j = 0; j < recodes.length; j++) {
    resultArray.push(recodes[j]);
  }

  sql = `SELECT lectureroomdescription.TIME, lectureroomdescription.roomStatus, lectureRoom.lectureRoomId FROM lectureroom, lectureroomdescription WHERE lectureroom.buildingName='${building}' AND lectureroomdescription.date='${date}' AND lectureroom.id=lectureroomdescription.lectureRoomId`
  recodes = await dbQuery(sql);
  recodes = recodes.rows;

  for (var j = 0; j < recodes.length; j++) {
    resultArray.push(recodes[j]);
  }

  var array = new Array();
  for (var j = 0; j < resultArray.length; j++) {
    array.push(resultArray[j]['lectureRoomId'])
    reservedRoomArray.push(resultArray[j]['lectureRoomId'])
  }

  array = Array.from(new Set(array));

  for (var l = 0; l < array.length; l++) {
    var result = resultArray.filter(function(recode) {
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
    if (reservedRoomArray.indexOf(queryResult[i].lectureRoomId) == -1) {
      for (var j = 0; j <= 27; j++) {
        stateList.push('A');
      }
      resultList = {
        building: building,
        lectureroom: queryResult[i].lectureRoomId,
        lectureRoomNum: queryResult[i].lectureRoomNum,
        stateList: stateList
      }
      jsonResult.push(resultList);
    }
  }

  res.json(jsonResult);
});

router.post('/create', async function(req, res) {
  var buildingName = req.body.buildingName;
  var lectureRoomId = req.body.lectureRoomId;
  var lectureRoomNum = req.body.lectureRoomNum;
  var num;
  var lectureRoom;
  console.log(buildingName)
  console.log(lectureRoomId)
  console.log(lectureRoomNum)
  let sql = 'select max(id) as num from lectureRoom';
  var queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  num = queryResult[0]['num'];
  num = num + 1;

  lectureRoom = buildingName[0] + lectureRoomId;

  sql = `select * from lectureroom where lectureRoomId='${lectureRoom}'`;
  query = await dbQuery(sql);
  query = query.rows;

  if (query.length == 0) {
    sql = `insert into lectureRoom(id, lectureRoomId, fixture, lectureRoomNum, floor, buildingName) values(${num}, '${lectureRoom}', null, '${lectureRoomNum}', '${lectureRoomId[0]}', '${buildingName}')`;
    queryResult = await dbQuery(sql);

    res.json({
      response: 'success'
    });
  } else {
    res.json({
      response: 'exist'
    });
  }
});

router.post('/prereserve', async function(req, res) {
  var lectureRoom = req.body.lectureRoom;
  var lectureRoomNum = req.body.lectureRoomNum;
  var date = req.body.date;
  var timeList = req.body.timeList;
  var num;

  lectureRoom = lectureRoom[0]+lectureRoomNum;

  let sql = `select max(id) as num from reservation`;
  var query = await dbQuery(sql);
  query = query.rows;

  num = query[0].num;
  num = num+1;

  sql = `select id from lectureroom where lectureRoomId='${lectureRoom}'`;
  let queryResult = await dbQuery(sql);
  queryResult = queryResult.rows;
  var id = queryResult[0].id;

  sql = `insert into reservation (id, beforeUri, afterUri, beforeTime, afterTime, leaderId, perpose, score, scoreReason, guardId, reservationType, reservationNum, randomStatus, priority, lectureRoomId) values(${num}, null, null, null, null, 8, null, null, null, null, 'X', null, null, null, ${id})`;
  queryResult = await dbQuery(sql);

  var day = calculateTime(date);

  for (var i = 0; i < timeList.length; i++) {
    sql = `select roomStatus from lectureroomdescription where time='${timeList[i]}' and date='${date}' and lectureRoomId = ${id}`;
    query = await dbQuery(sql);
    query = query.rows;

    if (query.length != 0) {
      if (query[0].roomStatus != 'X' && query[0].roomStatus!=null) {
        sql = `select reservationId from lectureroomdescription where time='${timeList[i]}' and date='${date}' and lectureRoomId = ${id}`
        queryResult = await dbQuery(sql);

        var reservationArray = new Array();

        for (var j = 0; j < recodes.length; j++) {
          reservationArray.push(queryResult[j].reservationId);
        }

        reservationArray = Array.from(new Set(reservationArray));

        for (var j = 0; j < recodes.length; j++) {
          sql = `delete from reservation where id=${reservationArray[j]}`
          queryResult = await dbQuery(sql);
        }
      }
    }

    sql = `insert into reservationdescription (reservationId, date, time) values(${num}, '${date}', '${i}')`;
    queryResult = await dbQuery(sql);

    sql = `insert into lectureroomdescription (lectureId, lectureRoomId, lectureTime, time, semester, roomStatus, date, day, reservationId) values(0, ${id}, 0, '${timeList[i]}', '2020-1', 'X', '${date}', '${day}', ${num})`;
    queryResult = await dbQuery(sql);
  }

  res.json({
    response: 'success'
  });
});

module.exports = router;