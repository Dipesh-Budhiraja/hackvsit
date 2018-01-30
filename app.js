
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Vendor = require('./models/vendor');

//import routes
var vending = require('./routes/vending');
var api = require('./routes/api');
var PayResponse = require('./routes/response');
var pgredirect = require('./routes/pgredirect');
var testtxn = require('./routes/testtxn');
var vendorRoutes = require('./routes/vendor');

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

//passport config
app.use(require('express-session')({
    secret: 'vsit hackathon',
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Vendor.authenticate()));
passport.serializeUser(Vendor.serializeUser());
passport.deserializeUser(Vendor.deserializeUser());

//routes
app.get('/', function(req, res){
    // res.render('landing', {currentUser: req.user});
    res.redirect('/vendor');
});
app.use('/vending',express.static('./publi/vending'))
app.use('/vending', vending);
app.use('/api',api);
// app.use('/payments',payment)
app.use('/vendor', vendorRoutes);
app.use('/testtxn',testtxn);
app.use('/response',PayResponse);
app.use('/pgredirect',pgredirect);

//app listen
var port = 3000;
app.listen(process.env.PORT || port, function(err){
    console.log('server on ' + port);
});