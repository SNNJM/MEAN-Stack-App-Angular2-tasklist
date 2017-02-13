//bring in express
var express = require('express');
var router = express.Router();

//set router for homepg,use get coz its gonna accept the get request
router.get('/', function(req, res, next){
    res.render('index.html');
});

//export this so we can access this on other file
module.exports = router;