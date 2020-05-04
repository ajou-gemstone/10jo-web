var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.get('/cafe', function(req,res){
    res.render('tables-cafe');
});

router.get('/classRegister', function(req, res) {
  res.render('register-class');
});

router.get('/lectureRoom', function(req, res) {
  res.render('tables-lectureroom');
});

router.get('/lectureRoomRegister', function(req, res) {
  res.render('register-class');
});

router.get('/reservation', function(req, res) {
  res.render('tables-reservation');
});

router.get('/student', function(req,res){
    res.render('tables-student');
});

router.get('/study', function(req,res){
    res.render('tables-study');
});



module.exports = router;
