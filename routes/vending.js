const express = require('express');
const router = express.Router();
var qr = require('qr-image');

// router.use(express.static('../publi/vending'))

router.get('/', (req, res) => {
    res.send('../publi/vending-machine.html');
});


router.post('/qr',(req,res)=>{
    var pngBuffer = qr.imageSync(`${req.body.machineId}`, { type: 'png'});
    res.send(pngBuffer.toString('base64'));
});

module.exports = router;