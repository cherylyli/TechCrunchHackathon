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
        Event.find({company: req.body.company}, function(err, events){
            if (err) throw err;
            if (!events) {
                resp.statusCode = 404;
                resp.errorMessage = "No events found";
            } else {
                resp.statusCode = 200;
                events.forEach(function(e){
                    if (e.expired === false) {
                        resp.data.future.push(e);
                    } else {
                        resp.data.past.push(e);
                    }
                });
            }
            res.json(resp);
            
        });
         
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
                events: {
                    past: [],
                    future: []
                }
            }
        };
        Company.findOne({_id: req.body.id}, function(err, company){
            if (err) throw err;
            resp.data.company = company;
            if (!company) {
                resp.statusCode = 500;
                resp.errorMessage = "No company found";
            } else {
                if (company.events) {
                    resp.statusCode = 200;
                    //console.log(company.events);
                    company.events.forEach(function(e){
                        if (e.expired === false) {
                            resp.data.events.past.push(Event.findOne({_id: e}));
                        } else {
                            resp.data.events.future.push(Event.findOne({_id: e}));
                        }
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
            errorMessage: "I'm sleepy",
            data: {}
        }
        Event.findOne({_id: req.body.id}, function(err, e){
            if (err) throw err;
            // create a local copy
            var omgCrazyShit = e;
            e.views =+ 1;
            e.save(function(err){
                if (err) throw err;
            });

            //console.log(resp.data);
            omgCrazyShit["remaining"] = e.numVisitors - e.registerer.length;
            if (e.remaining <= 0) {
                omgCrazyShit.full = true;
                console.log(omgCrazyShit.full);
                
            }
            Company.findOne({name: e.company}, function(err, company){
                if (err) throw err;
                var logo = company.logo;
                console.log("Event's startdate: " + e.startDate);
                omgCrazyShit.time = (e.startDate.getYear() +1900 )+ "年 " + (e.startDate.getMonth() + 1) + "月 "+ e.startDate.getDay() + "日 "+ e.startDate.getHours() + ":00－" + e.endDate.getHours() + ":00";
                console.log(omgCrazyShit.time);
                //e.time = "2016年 6月 9:00 - 17:00";
                //console.log(resp.data);
                console.log(omgCrazyShit);
                if (!company.hotness) {
                    company.hotness = 1;
                } else {
                     company.hotness += 1;    
                }
                // accumulate company hotn
                company.save(function(err){
                    if (err) throw err;
                });
                res.json({
                    statusCode: 200,
                    errorMessage: "oh mon dieu",
                    data: omgCrazyShit,
                    time: omgCrazyShit.time,
                    logo: logo
                });
            });
        });
    });
};