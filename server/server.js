var express = require('express');
var app = express();
var config = require('./globals/config');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var initController = require('./controllers/init.controller');
var userController = require('./controllers/user.controller');

app.use(cors());
mongoose.connect(config.getDBConnectionString());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(config.serverLogging);
app.use(require('express-promise')());
var sess   = {
		name: "ohIkgFh3KKxSS57",
		secret: "Cheryl",
		cookie: {
			secure: false,
			maxAge: 24*60*60*1000
		},
		resave: true,
    	saveUninitialized: false
	};

app.use(session(sess));

app.get('/', function(req, res){
   res.send("Cheryl says hi!");
});

initController(app);
userController(app);

process.env.PORT = process.env.PORT || 80;

app.listen(process.env.PORT, function(){
    console.log("running on " + process.env.PORT);
});