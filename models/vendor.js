const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var VendorSchema = new mongoose.Schema({
    username: String,
    password: String
});

VendorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Vendor', VendorSchema);
