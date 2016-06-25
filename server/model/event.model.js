var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    company     : String,
    title       : String,
    content     : String,
    numVisitors : Number,
    subsidiary  : [String],
    address     : String,
    registerer  : [Number],  // array of user ids
    startDate   : Date,        //weird time stuff
    endDate     : Date,
    expired     : Boolean,
    views       : Number,
    city        : String
    
});

var Event = mongoose.model("Event", eventSchema);

module.exports = Event;