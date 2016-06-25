var User    = require('../model/user.model');
var Company = require('../model/company.model');
var Event   = require('../model/event.model');
var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    
    //a person queries for events, search for a company's name, order by date
    app.post('/api/eventsByCompany', function(req, res){
        //req.body.event
        var resp = {
            statusCode: 500,
            errorMessage: "",
            data: {
                past: [],
                future: []
            }
        };
        var eventList = Event.find({company: req.body.company});
        if (eventList === 0) {
            resp.statusCode = 404,
            resp.errorMessage = "There are no events found for " + req.body.company + ".";
        } else {
            resp.statusCode = 200;
            resp.data = eventList;
            //sort events by past/present & also by time
            eventList.forEach(function(event){
                if (event.expired === false) {
                    resp.data.future.push({
                        time: event.startDate,
                        title: event.title,
                        left: event.numVisitors
                        });
                } else {
                    resp.data.past.push({
                        time: event.startDate,
                        title: event.title,
                        left: event.numVisitors
                        });    
                }
            });
        }
        res.json(resp);
         
    }); //POST /api/event
    
    app.get('/api/allcompanies', function(req, res){
        var resp = {
            statusCode: 200,
            errorMessage: "",
            data: Company.find({})
        };
        res.json(resp);
    }); //end GET /api/allcompanies
    
    //by id, get a company's detailed info
    app.post('/api/companyinfo', function(req, res){
        var resp = {
            statusCode: 500,
            errorMessage: "Nothing loaded",
            data: {
                company: {},
                events: []
            }
        };
        Company.findOne({_id: req.body.id}, function(err, company){
            if (err) throw err;
            resp.data.company = company;
            if (!company) {
                resp.statusCode = 500;
                resp.errorMessage = "No company found";
            } else {
                if (!resp.data.company.events) {
                    resp.statusCode = 200;
                    var eventList = resp.data.company.events;
                    eventList.forEach(function(e){
                    resp.data.events.push(Event.findOne({_id: e}));
                    });    
                } else {
                    resp.data.events = [];
                    resp.statusCode = 200;
                }
            }
            res.json(resp);
        });
        
        
        
        
    });
    
    app.post('/api/eventinfo', function(req, res){
        var resp = {
            statusCode: 200,
            errorMessage: "",
            data: Event.findOne({_id: req.body.id})
        };    
        res.json(resp);
    });
    
};