var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
    name            : String,
    image           : [String],
    logo            : String,
    companySize     : String,    //number of employees that the company has
    website         : String,        //company website
    speciality      : [String],   //list of interests of the company, eg. apps, virtual reality, digital marketing, machine learning
    industry        : String,       //eg. Internet, Banking
    type            : String,           //public or private or startup
    events          : [String], //id of events that the company has
    founded         : Number,
    description     : String
});
var Company = mongoose.model("Company", companySchema);

module.exports = Company;