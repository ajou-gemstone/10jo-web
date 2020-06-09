var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.get('/list', async function(req, res) {
  var timeList = new Array();
  let sql = `select id, leaderId, lectureRoomId from reservation where id!=0`;
  var recodes = await dbQuery(sql);
  recodes = recodes.rows;

  for(var i=0;i<recodes.length;i++){
    sql = `select lectureRoomId, buildingName from lectureroom where id=${recodes[i].lectureRoomId}`;
    var recode = await dbQuery(sql);
    recode = recode.rows;

    recodes[i].lectureRoomNum = recode[0].lectureRoomId;
    recodes[i].buildingName = recode[0].buildingName;

    sql = `select date, time from reservationdescription where reservationid=${recodes[i].id}`;
    var queryResult = await dbQuery(sql);
    queryResult = queryResult.rows;

    for (var j = 0; j < queryResult.length; j++) {
      timeList.push(queryResult[j].time)
    }

    timeList.sort(function(a, b) {
      return a - b;
    });

    sql = `select name from user where id=${recodes[i].leaderId}`;
    var query = await dbQuery(sql);
    query = query.rows;

    recodes[i].date = queryResult[0].date;

    recodes[i].startTime = timeList[0];
    recodes[i].lastTime = timeList[timeList.length - 1];

    recodes[i].leaderId = query[0].name;

    timeList = [];
  }

  res.json(recodes);
});

module.exports = router;
