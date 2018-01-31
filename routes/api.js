// import { log } from 'util';



const express = require('express');
const router = express.Router();
const Machine = require('../models/vending');
const config = require('../config/config')
const request = require('request')
// router.get('/getData', function (req, res) {
//     // let vendId=req.body.machineId;
//     res.send({
//         vendId: 123,
//         lat: 27,
//         long: 23,
//         products: [
//             {
//                 productId: 'p1',
//                 pname: 'lays',
//                 price: 20,
//                 currQ: 10,
//                 maxQ: 15,
//                 imgUrl: 'https://static.meijer.com/Media/000/28400/0002840042054_0600.png'

//             },

//             {
//                 productId: 'p2',
//                 pname: 'kurkure',
//                 price: 10,
//                 currQ: 10,
//                 maxQ: 15,
//                 imgUrl: 'https://www.bigbasket.com/media/uploads/p/l/102761_8-kurkure-namkeen-masala-munch.jpg'
//             }
//             ,
//             {
//                 productId: 'p3',
//                 pname: 'pepsi',
//                 price: 15,
//                 currQ: 10,
//                 maxQ: 15,
//                 imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/61kFbWto%2BOL._SY355_.jpg'
//             }
//         ]
//     })
// })


router.post('/getData', (req, res) => {
    // console.log(req.headers);
    // console.log(req.body)
    
    Machine.findOne({ vendId: req.headers.machineid }, (err, machine) => {
        if (err) {
            res.status(200).send(err);
        }
        if (machine) {
            // console.log(machine);
            request(
                {
                method:'post',
                url:'http://192.168.136.217:5000/12', 
                json: {user: "user97", products: {"Pringles": 0, "Lays": 0, "Pepsi": 2, "Mirinda": 0, "Snickers": 0, "Diary Milk Chocolate": 0, "Cadbury 5 Star": 0, "Sprite": 8, "Bingo Mad Angles": 0, "Kurkure Puffcorn": 0}, vendId: "vend123", availProds: ["Kurkure Puffcorn","Pringles","Dairy Milk Chocolate"]}, 
                headers: {  
                    "content-type": "application/json",
                },
                // json: true,
            }, function (error, response, body) {  
                //Print the Response
                // console.log(response);
                
                console.log(body);  
                // machine.re
            // console.log(machine.refer);
            // console.log(machine);
            
            res.send({machine:machine,refer:body});
                
        });     
        }
        else {
            res.send('code not found please scan again')
        }
    })
})

router.post('/transaction/:id',(req,res)=>{
    // console.log(req.body);
    // console.log(req.headers);
    var vendId=req.params.id;
    console.log(vendId);
    
    cart=req.headers.json;
    Machine.findById(vendId,(err,machine)=>{
        tempProd = machine.products;
        // console.log(tempProd);
        cart=JSON.parse(cart);
        cart=cart.cart;
        var price=0;
        // console.log(cart);
        
        for(var i in tempProd){
            // console.log(tempProd[i]);
            
            for(var j in cart){
                // console.log(tempProd[i]);
                // console.log(cart[j]);
                
                if(tempProd[i].ID==cart[j].id){
                    var a=tempProd[i]
                    a['Cur Quantity']=parseInt(a['Cur Quantity'])-parseInt(cart[j].quantity);
                 console.log(a['Cur Quantity']);
                 console.log(cart[j].quantity);
                 price+=a.Price*cart[j].quantity;
                 
                    
                }
            }
        }
        machine.products=tempProd;
        console.log(machine.products);
        machine.save(function(){
            date = new Date();
            // res.redirec({
                // console.log(vendId+price+date);
                // console.log(date.getTime());
                res.send({time:date.getTime(),price:price });
            // })
        });
    })
})


router.post('purchaseItems',(req,res)=>{
    vendId=req.body.machineId;
})


module.exports = router;

