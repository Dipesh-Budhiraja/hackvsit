// import { setInterval } from "timers";

$(function(){
    $btn=$('#btn');
    function vendId(){
        // console.log('hello');
        
        $.post('/vending/qr',{machineId:"vend123"},function(data){
            let source = 'data:image/png;base64, '
            
            let sourcenew =source+data;
            // console.log(sourcenew);
            console.log('new');
            
            $img=$('#show-img');
            $img.attr('src',sourcenew);
        })
    }
    vendId();
})  