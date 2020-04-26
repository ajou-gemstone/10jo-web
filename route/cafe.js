var express = require('express');
var multer = require('multer');
var router = express.Router();
var date;
var realresults;

router.get('/', function(req,res){
    res.render('tables-cafe.html');
});

module.exports = router;
