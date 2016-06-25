var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    phone: String,
    city: String,
    age: Number,
    speciality: [String],
    education: {
        level : String,  //highest level of education acheived: eg. high school, bach, masters, phd
        school: String,
        major : String
    },
    companiesOfInterest: [String],    //list of companies that the user is interested in
    events: [
                {
                    eventName: String,
                    expired  : Boolean
                }
            ]
   
});

var User = mongoose.model("User", userSchema);
module.exports = User;