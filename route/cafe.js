var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.get('/list', async function(req, res) {
  let sql = `select cafe.name, cafe.congestion, cafe.address, (select user.userId from user, cafe where user.id=cafe.userId) as userId, (select user.userPassword from user, cafe where user.id=cafe.userId) as userPassword, (select user.phoneNumber from user, cafe where user.id=cafe.userId) as phoneNumber from cafe`;
  var queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  res.json(queryResult);
});

router.get('/waiting', async function(req, res) {
  let sql = `select cafe.name, cafe.address, (select user.phoneNumber from user, cafe where user.id=cafe.userId) as phoneNumber from cafe where cafe.confirm=0`;
  var queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  res.json(queryResult);
});

router.post('/create', async function(req, res) {
  var userId = req.body.userId;
  var userPassword = req.body.userPassword;
  var cafeName = req.body.cafeName;
  var address = req.body.address;
  var phoneNumber = req.body.phoneNumber;
  var userNum, cafeNum;

  let sql = 'select count(*) as num from user';
  var queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  userNum = queryResult[0]['num'];
  userNum = userNum + 1;

  sql = 'select count(*) as num from cafe';
  queryResult = await dbQuery(sql);

  queryResult = queryResult.rows;

  cafeNum = queryResult[0]['num'];
  cafeNum = cafeNum + 1;

  sql = `insert into user(id, userId, userPassword, email, userType, photo, phoneNumber, score, studentNum) values(${userNum}, '${userId}', '${userPassword}', null, 3, null, '${phoneNumber}', null, null)`;
  queryResult = await dbQuery(sql);

  sql = `insert into cafe(id, name, address, latitude, longitude, congestion, imgSource, cafeBody, userId, confirm) values(${cafeNum}, '${cafeName}', '${address}', null, null, null, null, null, '${userNum}', 0)`;
  queryResult = await dbQuery(sql);

  res.json({
    response: 'success'
  });
});

module.exports = router;
