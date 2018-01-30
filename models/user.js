const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    transactions: [
        {
            tid: String,
            purchased: [Objects]
        },
        {
            tid: String,
            purchased: [Objects]
        }
    ],
});

VendingSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('VendingMachine', VendingSchema);
