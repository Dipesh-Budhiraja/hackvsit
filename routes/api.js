

const express = require('express');
const router = express.Router();
const Machine = require('../models/vending');


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
            res.send(machine);
        }
        else {
            res.send('code not found please scan again')
        }
    })
})




router.post('purchaseItems',(req,res)=>{
    vendId=req.body.machineId;
})


module.exports = router;

