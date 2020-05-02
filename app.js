var express =  require('express');
var http = require('http');
var ejs = require('ejs');
var multer = require('multer');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var admin = require('./route/admin.js');
var lectureRoom = require('./route/lectureRoom.js');
var reservation = require('./route/reservation.js');
var student = require('./route/student.js');
var cafe = require('./route/cafe.js');
var study = require('./route/study.js');
var lectureRoomRegister = require('./route/lectureRoomRegister.js');

var app = express();

app.get('/', function(req, res){
  res.render('login');
});

app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname,'views')));
app.set('view engine', 'html');

app.set('port', 5010);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/admin', admin);
app.use('/lectureRoom', lectureRoom);
app.use('/register', lectureRoomRegister);
app.use('/reservation', reservation);
app.use('/student', student);
app.use('/cafe', cafe);
app.use('/study', study);

http.createServer(app).listen(app.get('port'), function(){
    console.log("express start: %d ", app.get('port'));
});
