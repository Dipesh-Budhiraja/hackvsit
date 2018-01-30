var checksum = require('../models/checksum');
const express = require('express');
const router = express.Router();

module.exports = router 

	router.get('/', function(req,res){
   console.log("in pgdirect");
console.log("--------testtxnjs----");
res.render('pgredirect.ejs');
  });

//vidisha