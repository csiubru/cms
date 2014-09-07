var express = require('express'),
    path = require('path'),
    http = require('http'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    course = require('./routes/courses');

var app = express();


    app.set('port', process.env.PORT || 3000);
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));


app.get('/courses', course.findAll);
app.get('/courses/:id', course.findById);
app.post('/courses', course.addCourse);
app.put('/courses/:id', course.updateCourse);
app.delete('/courses/:id', course.deleteCourse);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
    console.log("Waiting for connect to DB...");
});
