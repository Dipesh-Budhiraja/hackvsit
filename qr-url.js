 
// var qr_svg = qr.image('https:localhost:5000/add', { type: 'png' });
// qr_svg.pipe(require('fs').createWriteStream('i_love_qr.png'));


var express=require('express');

var app=express();
app.use(express.static('publi'));

app.get('/vendor/qr',(req,res)=>{
    var pngBuffer = qr.imageSync('https://localhost:5000/hello', { type: 'png' ,parse_url:true});
    res.send(pngBuffer.toString('base64'));
})
app.get('/hello',(req,res)=>{
    res.send('hello');
})
// console.log(svg_string.toString('base64'));

app.listen(5000,()=>{
    console.log('running on 5000');
    
})

