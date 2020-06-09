var express = require('express');
var router = express.Router();
var dbQuery = require("../database/promiseQuery.js");

router.get('/cafe', function(req,res){
  if (req.session.uid==undefined || req.session.userType!=4) {
    res.redirect('/');
  }
  else{
    res.render('tables-cafe');
  }
});

router.get('/classRegister', function(req, res) {
  if (req.session.uid==undefined || req.session.userType!=1) {
    res.redirect('/');
  }
  else{
    res.render('register-class');
  }
});

router.get('/lectureRoom', function(req, res) {
  if (req.session.uid==undefined || req.session.userType!=4) {
    res.redirect('/');
  }
  else{
    res.render('tables-lectureroom');
  }
});

router.get('/lectureRoomRegister', function(req, res) {
  if (req.session.uid==undefined || req.session.userType!=4) {
    res.redirect('/');
  }
  else{
    res.render('register-lectureroom');
  }
});

router.get('/addressgeo', function(req, res) {
  if (req.session.uid==undefined) {
    res.redirect('/');
  }
  else{
    res.render('address-geo');
  }
});

router.get('/reservation', function(req, res) {
  if (req.session.uid==undefined || req.session.userType!=4) {
    res.redirect('/');
  }
  else{
    res.render('tables-reservation');
  }
});

router.get('/student', function(req,res){
  if (req.session.uid==undefined) {
    res.redirect('/');
  }
  else{
    res.render('tables-student');
  }
});

router.get('/study', function(req,res){
  if (req.session.uid==undefined || req.session.userType!=4) {
    res.redirect('/');
  }
  else{
    res.render('tables-study');
  }
});

router.get('/education', function(req,res){
  if (req.session.uid==undefined) {
    res.redirect('/');
  }
  else{
    res.render('educational-main');
  }
});

router.get('/admin', function(req,res){
  if (req.session.uid==undefined || req.session.userType!=4) {
    res.redirect('/');
  }
  else{
    res.render('index');
  }
});

router.get('/cafestaff', function(req,res){
  if (req.session.uid==undefined || req.session.userType!=3) {
    res.redirect('/');
  }
  else{
    var id = req.query.id;
    console.log(id);
    res.render('index_cafe',{id:id});
  }
});

router.get('/cafeedit', function(req,res){
  if (req.session.uid==undefined || req.session.userType!=3) {
    res.redirect('/');
  }
  else{
    res.render('cafe-edit');
  }
});

router.get('/register', function(req,res){
    res.render('register');
});

router.get('/prereserve', function(req,res){
  if (req.session.uid==undefined || req.session.userType!=1) {
    res.redirect('/');
  }
  else{
    res.render('priority-reserve');
  }
});

module.exports = router;
