var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.get('/list', async function(req, res, next) {
  let sql = 'select id, category, title, studyGroupNumCurrent, leaderId from study'
  let recodes = await dbQuery(sql);
  var timeList = new Array();

  recodes = recodes.rows

  for (let recode of recodes) {
    // sql = 'select tagName from studytag ';
    // sql += `where studyId in (select studyId from studyTag where studyId = ${recode['id']})`;
    // let queryResult = await dbQuery(sql);
    // recode.tagName = queryResult.rows;

    sql = `select user.name from user, userstudylist where studyId=${recode['id']} and userstudylist.userId=user.id`
    query = await dbQuery(sql);
    query = query.rows;
    recode.userList = query;

    sql = `select lectureRoom.lectureRoomId from lectureRoom, reservation, study where study.id=${recode['id']} and study.leaderId=${recode['leaderId']} and reservation.leaderId=study.leaderId and reservation.lectureRoomId=lectureRoom.id`
    queryList = await dbQuery(sql);
    queryList = queryList.rows;

    recode.lectureRoom = queryList;

    sql = `select reservationdescription.date, reservationdescription.time from reservation, reservationdescription where reservation.leaderId=${recode['leaderId']} and reservation.id=reservationdescription.reservationId`;
    var queryResult = await dbQuery(sql);
    queryResult = queryResult.rows;

    for (var j = 0; j < queryResult.length; j++) {
      timeList.push(queryResult[j].time)
    }

    timeList.sort(function(a, b) {
      return a - b;
    });

    if(queryResult.length==0){
      recode.date = [];
    }

    else{
      recode.date = queryResult[0].date;
    }

    recode.startTime = timeList[0];
    recode.lastTime = timeList[timeList.length - 1];

    timeList = [];
  }

  res.json(recodes);
});

module.exports = router;