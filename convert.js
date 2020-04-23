var express = require('express');
var multer = require('multer');
var router = express.Router();
var date;
var realresults;
router.route('/').get(function(req,res){
    res.render('login.html');
});
router.route('/login').get(function(req,res){
    res.render('login.html');
});
router.route('/main').get(function(req,res){
    res.render('index.html');
});
router.route('/register').get(function(req,res){
    res.render('register.html');
});
router.route('/lectureroom').get(function(req,res){
    res.render('tables-lectureroom.html');
});
router.route('/reservation').get(function(req,res){
    res.render('tables-reservation.html');
});
router.route('/student').get(function(req,res){
    res.render('tables-student.html');
});
router.route('/study').get(function(req,res){
    res.render('tables-study.html');
});
router.route('/cafe').get(function(req,res){
    res.render('tables-cafe.html');
});
router.route('/register').get(function(req,res){
    res.render('register.html');
});

module.exports = router;