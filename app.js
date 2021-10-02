var app = require('express')();
var http = require('http').Server(app);
// import { socket } from 'socket.io';
var io = require('socket.io')(http);
var a = 'hello bhai';

app.get('/',function(rq,res){
    res.sendFile(__dirname +'/index.html');
});

io.on('connection',function(socket){
    console.log('Connection added')
    socket.send(a)

    // setTimeout(function(){
    //     socket.send('Send meesge test kr raha mai');
    // },4000)

    socket.on('disconnect',function() {
        console.log('user left')
    });
});


http.listen(3000,function(){
    console.log('port on')
});
