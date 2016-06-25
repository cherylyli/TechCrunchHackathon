var User    = require('../model/user.model');
var Company = require('../model/company.model');
var Event   = require('../model/event.model');
var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    
    //a person queries for a specific company
    app.post('/api/company', function(req, res){
        var resp = {
            statusCode  : 500,
            errorMessage: "",
            data        : []
        };
        var companyList = Company.find({name: req.body.company});
        resp.data = companyList;
        resp.statusCode = 200;
        res.json(resp);
    });
    
    //a person queries for events, search for a company's name, order by date
    app.post('/api/event', function(req, res){
        //req.body.event
        var resp = {
            statusCode: 500,
            errorMessage: "",
            data: []
        };
        var eventList = Event.find({company: req.body.company});
        if (eventList === 0) {
            resp.statusCode = 404,
            resp.errorMessage = "There are no events found for " + req.body.company + ".";
        } else {
            resp.statusCode = 200;
            resp.data = eventList;   
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
    
};