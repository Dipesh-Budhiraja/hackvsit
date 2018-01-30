const express = require('express');
const router = express.Router();
const passport = require('passport');
var Vendor = require('../models/vendor');
var Machine = require('../models/vending')

router.get('/', (req, res) => {
    res.render('landing', { currentUser: req.user });
});

router.get('/login', protectRoutesFromLoggedInUser, (req, res) => {
    res.render('login', { currentUser: req.user });
});

//handling login
router.post('/login', protectRoutesFromLoggedInUser, passport.authenticate('local',
    {
        successRedirect: '/vendor/dashboard',
        failureRedirect: '/vendor/login'
    }), function (req, res) {

    });

router.get('/register', protectRoutesFromLoggedInUser, (req, res) => {
    res.render('register', { currentUser: req.user });
});

//handle signup logic
router.post('/register', protectRoutesFromLoggedInUser, function (req, res) {
    var newVendor = new Vendor({ username: req.body.username });
    Vendor.register(newVendor, req.body.password, function (err, user) {
        if (err) {
            req.flash('error', 'User Already Exist');
            return res.redirect('/vendor/register');
        } else {
            passport.authenticate('local')(req, res, function () {
                req.flash('success', 'Welcome ' + user.username + ' to Vendor Portal');
                res.redirect('/vendor/dashboard');
            });
        }
    });
});

router.get('/dashboard', isLoggedIn, function (req, res) {
    Vendor.findById(req.user.id).populate('machines').exec((err, vendor) => {
        if (err) {
            res.status(200).send(err);
        }
        if (vendor.machines.length != 0) {
            res.render('vendor-home', { currentUser: req.user, machines: vendor.machines });
        }
        else {
            res.send('no machines found')
        }
    });
});

router.get('/add-machine', isLoggedIn, (req, res) => {
    res.render('add-machine', {currentUser: req.user});
})

router.post('/add-machine', isLoggedIn, (req, res) => {
    Vendor.findById(req.user.id, (err, vendor) => {
        if (err) {
            res.status(200).send(err);
        }
        else {
            var mach = new Machine();
            mach.vendId = "vend" + mach.id;
            mach.locLat = req.body.locLat;
            mach.locLong = req.body.locLong;
            mach.products = req.body.products;
            mach.save();
            vendor.machines.push(mach);
            vendor.save();
            res.send('machine added')
        }
    })
})

router.get('/edit/:vendId', (req, res) => {
    let vendId = req.params.vendId;

    Machine.findById(vendId, (err, machine) => {
        // res.send(machine);

        res.render('edit-machine', { machine: machine, currentUser: req.user });
    })
})


router.post('/edit/:vendId', (req, res) => {
    let vendId = req.params.vendId;
    console.log(req.body);
    // Machine.findById(vendId,(err, machine) => {
    //     for(let i in req.body){
    //         machine.products.forEach((x,index,ar)=>{
    //             if(x.ID==i){
    //                 ar[index]['Cur Quantity']=x['Maximum Quantity'];
    //             }
    //         })
    //         machine.save(() => {
    //             console.log('hello');

    //         });
    //     }

    // });
    // for (var i in request.body) {
    //     Machine.aggregate(
    //         { $match: { ""} },
    //         { $sort: { "createdAt": -1 } },
    //         {
    //             $group: {
    //                 "_id": {
    //                     "last_message_between": {
    //                         $cond: [
    //                             {
    //                                 $gt: [
    //                                     { $substr: ["$senderName", 0, 1] },
    //                                     { $substr: ["$receiverName", 0, 1] }]
    //                             },
    //                             { $concat: ["$senderName", " and ", "$receiverName"] },
    //                             { $concat: ["$receiverName", " and ", "$senderName"] }
    //                         ]
    //                     }
    //                 }, "body": { $first: "$$ROOT" }
    //             }
    //         }, (err, newResult) => {
                
    //         }
    //     )
    // }
})

router.post('/remove/:vendId', (req, res)=> {
    let vendId = req.params.vendId;

    Machine.findByIdAndRemove(vendId, function(err){
        if(err){
            req.flash('error', 'Not Able to Remove');
            res.redirect('/vendor/dashboard');
        }else{
            req.flash('success', 'Suucessfully removed');
            res.redirect('/vendor/dashboard');
        }
    });
});


router.get('/logout', isLoggedIn, function (req, res) {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/vendor/login');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('/vendor/login');
    }
}

function protectRoutesFromLoggedInUser(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'You cannot access that route');
        res.redirect('/vendor');
    }
}

module.exports = router;