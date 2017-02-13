var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://SNNJM:SNNJM@ds151068.mlab.com:51068/tasklist', ['tasks']);
//at the end of it put array of collection that we wanna use
//if using downloaded db, set to localhost/tasks

//set router for taskpg,use get coz its gonna accept the get request

//get ALL tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get Single Task
// :id = id is dynamic, this is a place holder
//req.params.id get the id from db
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task
router.post('/task', function(req, res, next){
    //get task from a form
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};
    
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    
    if(task.title){
        updTask.title = task.title;
    }
    
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});

//export this so we can access this on other file
module.exports = router;