const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var VendingSchema = new mongoose.Schema({
    vendId:{type:String,unique:true},
    locLat:String,
    locLong:String,
    products:[mongoose.Schema.Types.Mixed],
});

// VendingSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('VendingMachine', VendingSchema);
