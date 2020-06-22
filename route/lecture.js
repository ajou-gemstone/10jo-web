var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");
var calculateTime = require('../utils/calculateTime');
const XLSX = require("xlsx");
var timeParser = require('../utils/timeParser');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

router.get('/list', async function(req, res, next) {
  var timeList = new Array();

  let sql = 'select * from lecture where id!=0';
  var queryResult = await dbQuery(sql);
  queryResult = queryResult.rows;

  for (var i = 0; i < queryResult.length; i++) {
    sql = `select lectureroom.lectureRoomId, lectureroomdescription.time, lectureroomdescription.day from lectureroom, lectureroomdescription where lectureroom.id=lectureroomdescription.lectureRoomId and lectureroomdescription.lectureId=${queryResult[i].id}`;
    var query = await dbQuery(sql);
    query = query.rows;

    if (query.length != 0) {
      for (var j = 0; j < query.length; j++) {
        timeList.push(query[j].day + query[j].time);
      }

      queryResult[i].timeList = timeList;
      queryResult[i].lectureRoomId = query[0].lectureRoomId;
    } else {
      queryResult[i].timeList = [];
      queryResult[i].lectureRoomId = "";
    }

    timeList = [];

    delete queryResult[i].taName;
  }

  res.json(queryResult);
});

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
  var lectureRoom = buildingName[0] + lectureRoomNum;
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if ((day + "").length < 2) {
    day = "0" + day;
  }

  year = year.toString();
  month = month.toString();
  day = day.toString();

  date = year + "-" + month + "-" + day;

  let sql = 'select max(id) as num from lecture';
  var queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  num = queryResult[0]['num'];
  num = num + 1;

  sql = `insert into lecture(id, lectureName, professorName, taName, lectureCode) values(${num}, '${lectureName}', '${professorName}', null, '${lectureCode}')`
  recodes = await dbQuery(sql);

  sql = `select id from lectureroom where lectureRoomId='${lectureRoom}'`;
  recodes = await dbQuery(sql);
  recodes = recodes.rows;
  var lectureRoomId = recodes[0].id;

  sql = `select * from lectureroomdescription where lectureId='${num}'`;
  let query = await dbQuery(sql);
  query = query.rows;

  if (query.length == 0) {
    for (var i = 0; i < timeList.length; i++) {
      for (var j = parseInt(timeList[i].startTime); j < parseInt(timeList[i].lastTime); j++) {
        sql = `insert into lectureroomdescription(lectureId, lectureRoomId, lectureTime, time, semester, roomStatus, date, day, reservationId) values(${num}, '${lectureRoomId}', 0, '${j}', '2020-1', 'L', '${date}', '${timeList[i].day}', 0)`
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

fs.readdir('excel', (error) => {
  // uploads 폴더 없으면 생성
  if (error) {
    fs.mkdirSync('excel');
  }
})

const storage = multer.diskStorage({
  destination: "./excel",
  filename: function(req, file, cb) {
    cb(null, "test.xlsx");
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  }
});
// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.post('/excelSave', upload.single('file'), async function(req, res) {
  console.log(req.file);
  res.send('Success');
})

router.post("/excel", async function(req, res, next) {
  var lectureList = new Array();
  let workbook = XLSX.readFile(__dirname + "/../excel/test.xlsx")
  let worksheet = workbook.Sheets["Sheet1"]

  var length = worksheet['!ref'];
  var tmp = new Array();
  var timeArray = new Array();

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if ((day + "").length < 2) {
    day = "0" + day;
  }

  year = year.toString();
  month = month.toString();
  day = day.toString();

  date = year + "-" + month + "-" + day;

  tmp = length.split(":");

  length = tmp[1].replace(tmp[1][0], "")
  for (var i = 1; i <= length; i++) {
    if (worksheet["D" + i] == undefined) {
      worksheet["D" + i] = {
        v: ""
      };
    }

    if (worksheet["E" + i] == undefined) {
      worksheet["E" + i] = {
        v: ""
      };
    }

    let lecture = {
      lectureName: worksheet["A" + i].v,
      lectureCode: worksheet["B" + i].v,
      professorName: worksheet["C" + i].v,
      lectureTime: worksheet["D" + i].v,
      lectureRoom: worksheet["E" + i].v,
    };
    lectureList.push(lecture);
  }

  for (var i = 0; i < lectureList.length; i++) {
    var timeList = lectureList[i].lectureTime;
    tmp = timeList.split(",");

    for (var j = 0; j < tmp.length; j++) {
      timeArray.push(...timeParser(tmp[j]));
    }

    lectureList[i].lectureTime = timeArray;
    timeArray = [];
  }

  tmp = [];

  for (var i = 0; i < lectureList.length; i++) {
    let sql = 'select max(id) as num from lecture';
    var queryResult = await dbQuery(sql);
    queryResult = queryResult.rows;

    num = queryResult[0]['num'];
    num = num + 1;

    sql = `insert into lecture(id, lectureName, professorName, taName, lectureCode) values(${num}, '${lectureList[i].lectureName}', '${lectureList[i].professorName}', null, '${lectureList[i].lectureCode}')`
    let recodes = await dbQuery(sql);

    sql = `select id from lectureroom where lectureRoomId='${lectureList[i].lectureRoom}'`;
    recodes = await dbQuery(sql);
    recodes = recodes.rows;
    var lectureRoomId = recodes[0].id;

    //timeList 구현
    lectureList[i].lectureTime.sort(function(a, b) {
      return a - b;
    });

    for (var j = 0; j < lectureList[i].lectureTime.length; j++) {
      tmp.push(lectureList[i].lectureTime[j][0]);
    }

    tmp = Array.from(new Set(tmp));
    timeArray = [];

    for (var l = 0; l < tmp.length; l++) {
      for (var j = 0; j < lectureList[i].lectureTime.length; j++) {
        var day = lectureList[i].lectureTime[j][0];

        if (day == tmp[l]) {
          var time = lectureList[i].lectureTime[j].replace(`${lectureList[i].lectureTime[j][0]}`, "");
          timeArray.push(parseInt(time));
        }
      }

      for (var j = parseInt(timeArray[0]); j < parseInt(timeArray[timeArray.length-1]); j++) {
        sql = `insert into lectureroomdescription(lectureId, lectureRoomId, lectureTime, time, semester, roomStatus, date, day, reservationId) values(${num}, '${lectureRoomId}', 0, '${j}', '2020-1', 'L', '${date}', '${tmp[l]}', 0)`
        recodes = await dbQuery(sql);
      }

      timeArray = [];
    }

    timeArray = [];
    tmp = [];
  }

  res.send("success");
})

module.exports = router;