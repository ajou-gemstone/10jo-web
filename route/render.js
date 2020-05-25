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
  res.render('register-lectureroom');
});
router.get('/addressgeo', function(req, res) {
  res.render('address-geo');
});

router.get('/classRegister', function(req, res) {
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

router.get('/education', function(req,res){
    res.render('educational-main');
});

router.get('/admin', function(req,res){
    res.render('index');
});

router.get('/cafestaff', function(req,res){
    var id = req.query.id;
    console.log(id);
    res.render('index_cafe',{id:id});
});

router.get('/cafeedit', function(req,res){
    res.render('cafe-edit');
});

router.get('/register', function(req,res){
    res.render('register');
});

router.get('/prereserve', function(req,res){
    res.render('priority-reserve');
});

module.exports = router;
