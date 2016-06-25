var User    = require('../model/user.model');
var Company = require('../model/company.model');
var Event   = require('../model/event.model');
var bodyParser = require('body-parser');
var globalFuncs = require('../globals/config');



module.exports = function(app){
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
   
    app.get('/api/home', function(req, res){
        //give back events and company
        var resp = {
            statusCode: 500,
            errorMessage: "",
            data: {
                company : [],
                hot     : [], // array of company objects
                events  : []
            }
        };
        Company.find({}, function(err, companies){
            if (err) throw err;
            companies.forEach(function(c){
                
                // randomly put stuff in "company" array
                if (Math.random() >= 0.3) {
                    resp.data.company.push(c);    
                } 
                resp.data.hot.push(c);
            });
            
            // sort events by hotness
            globalFuncs.sortListByHotness(companies);
            resp.data.hot = companies;
        
            //console.log(resp.data.hot);
            
            Event.find({}, function(err, events){
                if (err) throw err;
                if (events) {
                    
                    //for each event, push it into the resp object
                    events.forEach(function(e){
                        resp.data.events.push(e);         
                    });    
                    
                    resp.statusCode = 200;
                
                res.json(resp);
                res.end();    
                }
                //resp.statusCode = 200;
                
                //res.json(resp);
                //res.end();
            });
        });
        
    }); // end GET /api/home
    
    //login with sessions
    app.post('/api/login', function(req, res){
        var resp = {
            statusCode: 500,
            errorMessage: "",
            data: []
        };
        User.findOne({phone: req.body.phone}, function(err, user){
            if (err) throw err;
            if (!user) {
                resp.statusCode = 404;
                resp.errorMessage = "There is no user associated with the phone number";
            } else {
                resp.statusCode = 200;
                resp.data = user;
                //initiate session
                req.session.phone = req.body.phone;
            }
            res.json(resp);
            console.log(req.session.phone);
        });
    }); //end POST /api/login
    
    app.get('/api/logout', function(req, res){
        req.session.destroy(function(err){
            if (err) throw err;
        });
        res.send("success");
    }); //end GET /api/logout
    
    //get personal data
    app.get('/api/user/personal', function(req, res){
        var resp = {
            errorMessage: "",
            statusCode  : 500,
            data        : []
        };
        console.log(req.session.phone);
        if (req.session.phone) {
            resp.statusCode     = 200;
            resp.data = User.findOne({phone: req.session.phone});
        } else {
            resp.errorMessage   = "No user logged in";
            resp.statusCode     = 404;
        }
        res.json(resp);
    });
    
    //get a person's events
    app.post('/api/user/myevents', function(req, res){
        var resp = {
            statusCode: 500,
            errorMessage: "Not logged in",
            data: {
                past: [],
                future: []
            }
        };
        if (req.session.phone){
            resp.statusCode = 200;
            User.findOne({phone: req.session.phone}, function(err, user){
                if (err) throw err;
                user.events.forEach(function(e){
                    var newEvent = Event.findOne({_id: e});
                    if (newEvent.expired === false) {
                        resp.data.future.push(newEvent);
                    } else {
                        resp.data.past.push(newEvent);
                    }
                });
                res.json(resp);
            });
        }
    });
    
    //register for an event
    app.post('/api/attend',function(req, res){
        // if the user has a session, then the req.session.phone would be set & would be truthy
        if (req.session.phone) {
            User.findOne({phone: req.session.phone}, function(err, user){
                if (err) throw err;
                user.events.push(req.body.id);
                user.save(function(err){
                   if (err) throw err; 
                });
                Event.findOne({_id: req.body.id}, function(err, event){
                    if (err) throw err;
                    event.registerer.push(req.session.phone);
                    event.save(function(err){
                        if (err) throw err;
                    });
                    res.send("sucess");
                });
            });
        } 
    });
    
    app.post('/api/user/following', function(req, res){
        if (!req.session.phone) {
            res.json({
                errorMessage: "not logged in",
                statusCode: 500
            });
        } else {
            var resp = {
                errorMessage: "",
                statusCode: 200,
                data: []
            };
            User.findOne({phone: req.session.phone}, function(err, user){
                if (err) throw err;
                var eventlist = user.events;
                eventlist.forEach(function(e){
                     resp.data.push(Event.findOne({_id: e}));
                });
                res.json(resp);
            });
            
        }
    });
    
};