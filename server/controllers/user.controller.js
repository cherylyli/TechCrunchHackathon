var User    = require('../model/user.model');
var Company = require('../model/company.model');
var Event   = require('../model/event.model');
var bodyParser = require('body-parser');

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
                hot     : [],
                events  : []
            }
        };
        Company.find({}, function(err, companies){
            if (err) throw err;
            companies.forEach(function(c){
                if (Math.random() >= 0.3) {
                    resp.data.company.push(c);    
                } else {
                    resp.data.hot.push(c);   
                }
            });
            Event.find({}, function(err, events){
                if (err) throw err;
                if (events) {
                    events.forEach(function(e){
                        resp.data.events.push(e);         
                    });    
                }
                resp.statusCode = 200;
                
                res.json(resp);
                res.end();
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
    
    //update personal data
    app.post('/api/user/personal', function(req, res){
        
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
                });
            });
        } 
    });
    
};