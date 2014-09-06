var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'), //06-09-14
    logger = require('morgan'),         //06-09-14
    cookieParser = require('cookie-parser'),    //06-09-14
    bodyParser = require('body-parser'),        //06-09-14
    http = require('http'),
    wine = require('./routes/wines');

var app = express();

// app.configure(function () { //remove for new version of configuration 06-09-14
    app.set('port', process.env.PORT || 3000);
//    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
//    app.use(express.bodyParser()), //new version of body-parser
    app.use(express.static(path.join(__dirname, 'public')));
// }); //new version of configuration 06-09-14

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
