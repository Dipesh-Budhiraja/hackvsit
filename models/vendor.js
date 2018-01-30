const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// var machine = require('./vending.js');
var VendorSchema = new mongoose.Schema({
    username: String,
    password: String,
    machines:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'VendingMachine',
        }
    ]
});

VendorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Vendor', VendorSchema);
