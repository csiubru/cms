var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('coursedb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'coursedb' database");
        db.collection('courses', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'courses' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving course: ' + id);
    db.collection('courses', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('courses', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addCourse = function(req, res) {
    var course = req.body;
    console.log('Adding course: ' + JSON.stringify(course));
    db.collection('courses', function(err, collection) {
        collection.insert(course, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateCourse = function(req, res) {
    var id = req.params.id;
    var course = req.body;
    delete course._id;
    console.log('Updating course: ' + id);
    console.log(JSON.stringify(course));
    db.collection('courses', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, course, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating course: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(course);
            }
        });
    });
};

exports.deleteCourse = function(req, res) {
    var id = req.params.id;
    console.log('Deleting course: ' + id);
    db.collection('courses', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var courses = [
    {
        cid: "412000",
        cnameT: "CHATEAU DE SAINT COSME",
        cnameE: "CHATEAU DE SAINT COSME",
        ccredit: "3(2-2-5)",
        cgroup: "001",
        cpre1: "4120000",
        cpre2: "4120000",
        cdescript: "12121",
        ctext: "Grenache"
    },
    {
        cid: "412000",
        cnameT: "CHATEAU DE SAINT COSME",
        cnameE: "CHATEAU DE SAINT COSME",
        ccredit: "3(2-2-5)",
        cgroup: "001",
        cpre1: "4120000",
        cpre2: "4120000",
        cdescript: "12121",
        ctext: "Grenache"
    }];
    db.collection('courses', function(err, collection) {
        collection.insert(courses, {safe:true}, function(err, result) {});
    });

};