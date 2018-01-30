
const express = require('express');
const router = express.Router();
const Machine = require('../models/vending');


router.post('getData',function(req,res){
    let vendId=req.body.machineId;
    res.send({
        vendId:123,
        lat:27,
        long:23,
        products:{
            lays:{
                price:20,
                currQ:10,
                maxQ:15,
                imgUrl:'https://static.meijer.com/Media/000/28400/0002840042054_0600.png'
            },

            kurkure:{
                price:10,
                currQ:10,
                maxQ:15,
                imgUrl:'https://www.bigbasket.com/media/uploads/p/l/102761_8-kurkure-namkeen-masala-munch.jpg'
            }
,
            pepsi:{
                price:15,
                currQ:10,
                maxQ:15,
                imgUrl:'https://images-na.ssl-images-amazon.com/images/I/61kFbWto%2BOL._SY355_.jpg'
            }
        }
    })
})


router.post('getActualVending',(req,res)=>{
    Machine.find({vendId:req.body.machineId},(err,machine)=>{
        if(err){
            res.status(200).send(err);
        }
        if(machine){
        console.log(machine)
        res.send(machine.json());
        }
        else{
            res.send('code not found please scan again')
        }
    })
})