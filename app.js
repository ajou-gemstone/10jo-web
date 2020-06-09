var express = require('express');
var http = require('http');
var ejs = require('ejs');
var multer = require('multer');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var admin = require('./route/admin.js');
var lecture = require('./route/lecture.js');
var lectureRoom = require('./route/lectureRoom.js');
var reservation = require('./route/reservation.js');
var student = require('./route/student.js');
var cafe = require('./route/cafe.js');
var study = require('./route/study.js');
var lectureRoomRegister = require('./route/lectureRoomRegister.js');
var classRegister = require('./route/classRegister.js');
var education = require('./route/education.js');
var render = require('./route/render.js');
var cafestaff = require('./route/cafestaff.js');
var cafeedit = require('./route/cafeedit.js');
var register = require('./route/register.js');
var prereserve = require('./route/prereserve.js');
var user = require('./route/user.js');
var cors = require('cors');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = require('./database/database.js');

var app = express();
var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'asmr',
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}))

app.get('/', function(req, res) {
  if (req.session.uid==undefined) {
    res.render('login');
  } else {
    delete req.session.uid;
    res.redirect('/');
  }
});

app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'html');

app.set('port', 5010);

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use('/', render);
app.use('/admin', admin);
app.use('/lecture', lecture);
app.use('/lectureRoom', lectureRoom);
app.use('/lectureRoomRegister', lectureRoomRegister);
app.use('/reservation', reservation);
app.use('/student', student);
app.use('/cafe', cafe);
app.use('/study', study);
app.use('/classRegister', classRegister);
app.use('/education', education);
app.use('/cafestaff', cafestaff);
app.use('/cafeedit', cafeedit);
app.use('/register', register);
app.use('/prereserve', prereserve);
app.use('/user', user);

http.createServer(app).listen(app.get('port'), function() {
  console.log("express start: %d ", app.get('port'));
});
