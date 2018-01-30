const express = require('express');
const router = express.Router();
const passport = require('passport');
var Vendor = require('../models/vendor');


router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/login', (req, res)=> {
    res.render('login');
});

router.get('/register', (req, res)=> {
    res.render('register');
});

//handle signup logic
router.post('/register', function(req, res){
    var newVendor = new Vendor({username: req.body.username});
    Vendor.register(newVendor, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.render('register');
        }else{
            passport.authenticate('local')(req, res, function(){
                req.flash('success', 'Welcome to YelpCamp ' + user.username);
                // res.redirect('/vendor/vendor-home');
                res.send('success');
            });
        }
    });
});

router.get('/vendor-home', function(req, res){
    res.render('vendor-home');
});

module.exports = router;