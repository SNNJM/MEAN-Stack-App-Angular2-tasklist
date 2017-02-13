//this is the server back end
var express = require('express');
var path = require('path');//a system module
var bodyParser = require('body-parser');

//gonna have 2 pg for routing--index & task--hence these 2 var created
var index = require('./routes/index');
var tasks = require('./routes/tasks');

//set the server port
var port = 3000;

//this the main app variabl
var app = express();

//view engine
//what system we wanna use for our views--this tell our view gonna be in view folder
app.set('views', path.join(__dirname, 'views'));
//specify the engine
app.set('view engine', 'ejs');
//wanna be able to run file within html extension
app.engine('html', require('ejs').renderFile);

//this is where we gona put our angular stuff
// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));
//all angular stuff will be in client folder

// Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//this is the route
app.use('/', index); //home pg is associated with index
app.use('/api', tasks); //so whenever we wanna interact with api, use /api

//create this so we can listen to our server
//put a call back fn so we can do something when server connect
app.listen(port, function(){
    console.log('Server started on port '+port);
});