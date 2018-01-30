const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    transactions: [
        {
            tid: String,
            purchased: [
                {

                    productId: 'p3',
                    pname: 'pepsi',
                    price: 15,
                    quantity:2,
                    imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61kFbWto%2BOL._SY355_.jpg'

                },
                {

                    productId: 'p2',
                    pname: 'kurkure',
                    price: 15,
                    quantity:,
                    imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61kFbWto%2BOL._SY355_.jpg'

                }
            ]
        },
        {
            tid: String,
            purchased: [
                {

                    productId: 'p3',
                    pname: 'pepsi',
                    price: 15,
                    quantity:2,
                    imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61kFbWto%2BOL._SY355_.jpg'

                },
                {

                    productId: 'p2',
                    pname: 'kurkure',
                    price: 15,
                    quantity:1,
                    imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61kFbWto%2BOL._SY355_.jpg'

                }
            ]
        }
    ],
});

VendingSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('VendingMachine', VendingSchema);
