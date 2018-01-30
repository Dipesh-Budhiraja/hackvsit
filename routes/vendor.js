const express = require('express');
const router = express.Router();
const passport = require('passport');
var Vendor = require('../models/vendor');
var Machine = require('./vending.js')

router.get('/', (req, res) => {
    res.render('landing', {currentUser: req.user});
});

router.get('/login', protectRoutesFromLoggedInUser, (req, res)=> {
    res.render('login', {currentUser: req.user});
});

//handling login
router.post('/login', protectRoutesFromLoggedInUser, passport.authenticate('local',
    {
        successRedirect: '/vendor/dashboard',
        failureRedirect: '/vendor/login'
    }), function(req, res){

});

router.get('/register', protectRoutesFromLoggedInUser, (req, res)=> {
    res.render('register', {currentUser: req.user});
});

//handle signup logic
router.post('/register', protectRoutesFromLoggedInUser, function(req, res){
    var newVendor = new Vendor({username: req.body.username});
    Vendor.register(newVendor, req.body.password, function(err, user){
        if(err){
            req.flash('error', 'User Already Exist');
            return res.redirect('/vendor/register');
        }else{
            passport.authenticate('local')(req, res, function(){
                req.flash('success', 'Welcome ' + user.username + ' to Vendor Portal' );
                res.redirect('/vendor/dashboard');
            });
        }
    });
});

router.get('/dashboard', isLoggedIn, function(req, res){
    Vendor.findById(req.user.id).populate('machines').exec((err,vendor)=>{
        if(err){
            res.status(200).send(err);
        }
        if(vendor.machines.length!=0){
            res.render('vendor-home', {currentUser: req.user,machines:vendor.machines});
            
            // res.send(vendor.machines);
        }
        else{
            res.send('no machines found')
        }
});
});


router.get('/add-machine',(req,res)=>{
    res.render('add-machine');
})




router.post('/add-machine',(req,res)=>{
    Vendor.findById(req.user.id,(err,vendor)=>{
        if(err){
            res.status(200).send(err);
        }
        else{
            var mach=new Machine();
            mach.vendId="vend"+mach.id;
            mach.locLat=req.body.locLat;
            mach.locLong = req.body.locLong;
            mach.products = req.body.products;
            mach.save();
            vendor.machines.push(mach);
            vendor.save();
            res.send('machine added')
        }   
    })
})

router.get('/machine/:vendId',(req,res)=>{
    let vendId=req.params.vendId;

    Machine.find({vendId},(err,machine)=>{
        res.render('edit-machine',{mach:machine});
    })
})


router.post('/modify-machine',(req,res)=>{
    let mach = req.body.mach;
    vendId=mach.vendId;
    Machine.findOne({vendId},(err,mach1)=>{
        mach1=mach;
        mach1.save();
    });
    res.send({'message':'updates','machine':mach});
})


router.get('/logout', isLoggedIn, function(req, res){
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/vendor/login');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('/vendor/login');
    }
}

function protectRoutesFromLoggedInUser(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }else{
        req.flash('error', 'You cannot access that route');
        res.redirect('/vendor');
    }
}

module.exports = router;