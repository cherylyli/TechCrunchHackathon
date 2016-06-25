var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    company     : String,
    subsidiary  : String,
    address     : String,
    registerer  : [Number],  // array of user ids
    startDate   : Date,        //weird time stuff
    endDate     : Date,
    expired     : Boolean
    
});

var Event = mongoose.model("Event", eventSchema);

module.exports = Event;