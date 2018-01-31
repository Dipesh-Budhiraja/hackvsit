var checksum = require('../models/checksum');
var config = require('../config/config');
const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
  // console.log("in restaurant");
  // console.log("--------testtxnjs----");
  res.render('testtxn.ejs', { 'config': config ,"orderId":req.query.time,"price":req.query.price});
});


router.post('/', function (req, res) {
  console.log("POST Order start");
  var paramlist = req.body;
  var paramarray = new Array();
  console.log(paramlist);
  for (name in paramlist) {
    if (name == 'PAYTM_MERCHANT_KEY') {
      var PAYTM_MERCHANT_KEY = paramlist[name];
    } else {
      paramarray[name] = paramlist[name];
    }
  }
  console.log(paramarray);
  paramarray['CALLBACK_URL'] = 'http://192.168.136.210:3000/response';  // in case if you want to send callback
  console.log(PAYTM_MERCHANT_KEY);
  checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result) {
    console.log(result);
    res.render('pgredirect.ejs', { 'restdata': result });
  });

  console.log("POST Order end");

});
//vidisha
module.exports = router;
