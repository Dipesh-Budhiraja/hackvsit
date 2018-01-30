const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//app
var app = express();

app.get('/', function(req, res){
    res.send('home page');
});
//import routes
var vendor = require('./routes/vendor');
app.use('/vendor', vendor);

var port = 3000;
app.listen(process.env.PORT || port, function(err){
    console.log('server on ' + port);
});