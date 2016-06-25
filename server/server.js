var express = require('express');
var app = express();
var config = require('./globals/config');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var initController = require('./controllers/init.controller');

app.use(cors());
mongoose.connect(config.getDBConnectionString());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(config.serverLogging);

app.get('/', function(req, res){
   res.send("Cheryl says hi!");
});

initController(app);

process.env.PORT = process.env.PORT || 80;

app.listen(process.env.PORT, function(){
    console.log("running on " + process.env.PORT);
});