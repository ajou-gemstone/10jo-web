var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");
var crypto = require('crypto');

router.get('/list', async function(req, res) {
  var userList = new Array();

  let sql = `select id, name, email, studentNum from user`;
  var queryResult = await dbQuery(sql);
  queryResult = queryResult.rows;

  for(var i=0;i<queryResult.length;i++){
    sql = `select studyId from userstudylist where userId=${queryResult[i].id}`;
    var query = await dbQuery(sql);
    query = query.rows;

    for(var j=0;j<query.length;j++){
      sql = `select title from study where id=${query[j].studyId}`;
      var recodes = await dbQuery(sql);
      recodes = recodes.rows;

      query[j].title = recodes[0].title;
    }

    queryResult[i].studyList = query
  }

  res.json(queryResult);
});

router.post('/login', async function(req, res, next) {
  var id = req.body.userId;
  var password = req.body.password;
  let sql = `select id, salt, userPassword, userType from user where userId='${id}'`;
  let recodes = await dbQuery(sql);
  recodes = recodes.rows;

  let hashPassword = crypto.createHash("sha512").update(password+recodes[0].salt).digest("hex");

  if (hashPassword == recodes[0].userPassword) {
    res.json({id: recodes[0].id, userType: recodes[0].userType});
  }

  else{
    res.json({id: -1});
  }
});

module.exports = router;
