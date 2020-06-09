var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");
var crypto = require('crypto');

router.get('/info', async function(req, res) {
  var userId = req.query.id;

  let sql = `select cafe.name, cafe.address, user.phoneNumber, cafe.congestion, cafe.cafeBody from cafe, user where user.id=${userId} and user.id=cafe.userId`;
  var queryResult = await dbQuery(sql);
  queryResult = queryResult.rows;

  res.json(queryResult);
});

router.get('/list', async function(req, res) {
  var userList = new Array();

  let sql = `select cafe.id, cafe.userId, cafe.name, cafe.congestion, cafe.address from cafe where cafe.confirm=1`;
  var queryResult = await dbQuery(sql);
  queryResult = queryResult.rows;

  for (var i = 0; i < queryResult.length; i++) {
    sql = `select user.userId, user.phoneNumber from user, cafe where user.id=${queryResult[i].userId}`;
    var query = await dbQuery(sql);
    query = query.rows;
    queryResult[i].userId = query[0].userId;
    queryResult[i].phoneNumber = query[0].phoneNumber;
  }

  res.json(queryResult);
});

router.get('/waiting', async function(req, res) {
  let sql = `select cafe.id, cafe.name, cafe.address, cafe.userId from cafe where cafe.confirm=0`;
  var queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  for (var i = 0; i < queryResult.length; i++) {
    sql = `select user.phoneNumber from user, cafe where user.id=${queryResult[i].userId}`;
    var query = await dbQuery(sql);

    query = query.rows;

    queryResult[i].phoneNumber = query[i].phoneNumber;
  }

  res.json(queryResult);
});

router.post('/create', async function(req, res) {
  var userId = req.body.userId;
  var userPassword = req.body.userPassword;
  var cafeName = req.body.cafeName;
  var address = req.body.address;
  var phoneNumber = req.body.phoneNumber;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var userNum, cafeNum;

  let sql = 'select max(id) as num from user';
  var queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  userNum = queryResult[0]['num'];
  userNum = userNum + 1;

  sql = 'select max(id) as num from cafe';
  queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  cafeNum = queryResult[0]['num'];
  cafeNum = cafeNum + 1;

  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(userPassword + salt).digest("hex");

  sql = `insert into user(id, userId, userPassword, email, userType, photo, phoneNumber, score, studentNum, salt) values(${userNum}, '${userId}', '${hashPassword}', null, 3, null, '${phoneNumber}', null, null, '${salt}')`;
  queryResult = await dbQuery(sql);

  sql = `insert into cafe(id, name, address, latitude, longitude, congestion, imgSource, cafeBody, userId, confirm) values(${cafeNum}, '${cafeName}', '${address}', '${latitude}', '${longitude}', 0, null, '카페 정보 없음', '${userNum}', 0)`;
  queryResult = await dbQuery(sql);

  res.json({
    response: 'success'
  });
});

router.post('/edit', async function(req, res) {
  var userId = req.body.userId;
  var cafeName = req.body.cafeName;
  var phoneNumber = req.body.phoneNumber;
  var congestion = req.body.congestion;
  var cafeBody = req.body.cafeBody;
  var time = req.body.time;
  console.log(time);
  let sql = `update cafe set name='${cafeName}', congestion='${congestion}', cafeBody='${cafeBody}', updateTime='${time}' where userId=${userId}`;
  var queryResult = await dbQuery(sql);

  sql = `update user set phoneNumber='${phoneNumber}' where id=${userId}`;
  queryResult = await dbQuery(sql);

  res.json({
    response: 'success'
  });
});

router.post('/confirm', async function(req, res) {
  var cafeId = req.body.cafeId;

  let sql = `update cafe set confirm=1 where id=${cafeId}`;
  var queryResult = await dbQuery(sql);

  res.json({
    response: 'success'
  });
});

router.post('/delete', async function(req, res) {
  var cafeId = req.body.cafeId;
  console.log(cafeId);
  let sql = `select userId from cafe where id=${cafeId}`;
  var queryResult = await dbQuery(sql);
  queryResult = queryResult.rows;

  sql = `delete from cafe where id=${cafeId}`;
  var query = await dbQuery(sql);

  sql = `delete from user where id=${queryResult[0].userId}`;
  queryResult = await dbQuery(sql);

  res.json({
    response: 'success'
  });
});

module.exports = router;
