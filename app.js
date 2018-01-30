const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const methodOverride = require('method-override');
const flash = require('connect-flash');

//import routes
var vendor = require('./routes/vendor');

//mongo connect
mongoose.connect('mongodb://admin:admin@ds217898.mlab.com:17898/vending-machine');

//app
var app = express();

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

//routes
app.get('/', function(req, res){
    res.send('home page');
});
app.use('/vendor', vendor);

//app listen
var port = 3000;
app.listen(process.env.PORT || port, function(err){
    console.log('server on ' + port);
});