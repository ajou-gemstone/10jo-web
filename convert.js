var express = require('express');
var multer = require('multer');
var router = express.Router();
var date;
var realresults;
router.route('/').get(function(req,res){
    res.render('login.html');
});
router.route('/main').get(function(req,res){
    res.render('index.html');
});
router.route('/calender').get(function(req,res){
    res.render('calender3.html');
});
router.route('/help').get(function(req,res){
    res.render('help.html');
});
router.route('/amusementpark').get(function(req,res){
    res.render('amusementpark.html');
});
router.route('/pastinfo').get(function(req,res){
    res.render('pastinfo.html');
});

router.route('/everland').get(function(req,res){
    res.render('everlandfee.html');
});
router.route('/lotteworld').get(function(req,res){
    res.render('lotteworldfee.html');
});
router.route('/eworld').get(function(req,res){
    res.render('eworldfee.html');
});
router.route('/weather').get(function(req,res){
    res.render('weatherrealtime.html');
});
router.route('/date').get(function(req,res){
    res.render('selectDate.html');
});
router.route('/complete').get(function(req,res){
    res.render('complete.html');
});
router.route('/datareceive').get(function(req,res){
    res.render('complete.html');
});
router.get('/send_data', function(req, res, next){
    res.render('selectDate.html', { title: '' });
});

module.exports = router;