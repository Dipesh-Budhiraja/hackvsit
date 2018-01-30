const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var VendingSchema = new mongoose.Schema({
    vendId:String,
    locLat:String,
    locLong:String,
    products:[mongoose.Schema.Types.Mixed],
});

VendingSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('VendingMachine', VendingSchema);
