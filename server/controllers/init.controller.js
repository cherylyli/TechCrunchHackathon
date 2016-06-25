var User = require('../model/user.model');
var Company = require('../model/company.model');
var bodyParser = require('body-parser');


module.exports = function(app){
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    
    /*
    Try to find a phone number that matches the one passed from req,
    if not found, then create an user with that phone number
    
    */
    app.post('/api/signup', function(req, res){
        User.find({phone: req.body.phone}, function(err, existingProf){
	       if (err) {
	           throw err;
	       } else if (existingProf.length === 0) { //if username doesn't exist, create new profile
	                //console.log(req.body.email + ' ' + req.body.locationLong +' '+ req.body.locationLat);
	            
	           var newUser = User ({
	               phone   : req.body.phone,
	               city    : req.body.city || "",
	               age     : req.body.age || 20, 
	               speciality  : [],
	               education   : {
	                   level   : "",
	                   school  : "",
	                   major   : ""
	               },
	               companiesOfInterest: [],
	               events  : []
	           });
	        
	           newUser.save(function(err){
	               if (err) throw err;
	               res.end("success");
	           });
	       } else {
	           res.end({
	               errorMessage: "phone number already taken",
	               errorType: "phone"
	           });
	       } // end IFELSE block
	   });
    }); //end app.post('/api/signup')
    
    app.post('/api/companyinfo', function(req, res){
        Company.find({name: req.body.name}, function(err, companies){
            if (err) throw err;
            if (companies.length === 0){
                var newCompany = Company({
                    name        : req.body.name,
                    address     : req.body.address,
                    companySize : req.body.size,
                    website     : req.body.website,
                    speciality  : req.body.speciality,
                    industry    : req.body.industry,       //eg. Internet, Banking
                    type        : req.body.type,           //public or private or startup
                    events      : [], //id of events that the company has
                    founded     : req.body.founded,
                    description : req.body.description || "" 
                });
                
                newCompany.save(function(err){
                    if (err) throw err;
                    res.end("success");
                });
            } else {
                res.end({
                   errorType: "company",
                   errorMessage : "The company is already in the database"
                });
            } //end IFELSE block
        });
    }); //end POST('/api/companyinfo')
};