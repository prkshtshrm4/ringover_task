// var app = require('express')();
// var http = require('http').Server(app);
// const cron = require('node-cron');
// const mysql = require('mysql');
// var io = require('socket.io')(http);
// const moment = require('moment');
// var a = ['10:00:00','0:0:1']


// app.get('/',function(rq,res){
//     res.sendFile(__dirname +'/index.html');
// });

// io.on('connection',function(socket){

//     //start

    

//     //end
//     console.log('Connection added')
//     socket.send("hellosdvgbsdvg")

//     // setTimeout(function(){
//     //     socket.send('Send meesge test kr raha mai');
//     // },4000)

//     socket.on('disconnect',function() {
//         console.log('user left')
//     });
// });
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "test_db",
//     port:"3306"
// })

// connection.connect((err) => {
//     if(err){
//         throw err
//     }
//     else{
//         console.log("connected")
        
        
        
//     }

//     cron.schedule('1 * * * * *',function(req,res) {
//         console.log("cron job running");
//         // var now = moment();
//         // var time = now.hour() + ':' + now.minutes() + ':' + now.seconds();
//         // console.log("Time: "+ time)

//         var now = moment();
//         var then = moment().add(5,'minutes');
//         var time_after = then.hour() + ':' + then.minutes() + ':' + then.seconds();
//         var time = now.hour() + ':' + now.minutes() + ':' + now.seconds();
//         console.log('then Time :'+ time_after)
//         console.log("Time: "+ time)
//         var Time1= time
//         var Time2= time_after
//         var a = [];
//         let Fetch_time_data = "SELECT * FROM time WHERE time BETWEEN ? AND ? ";
//         let query = connection.query(Fetch_time_data,[Time1,Time2],  (err, results) => {
//             if (err) throw err;
//             console.log(results);
//             results.map((data) => {
//                 console.log('data :'+ data.time)
//                 a.push(data.time)
//                 if(data == results[results.length -1]){
//                     return a;
//                     socket.send(a)

//                 }
//             });
            
            
//         });

        
        
       
//     });

// // function get_timedata()  {
// //         var now = moment();
// //         var then = moment().add(5,'minutes');
// //         var time_after = then.hour() + ':' + then.minutes() + ':' + then.seconds();
// //         var time = now.hour() + ':' + now.minutes() + ':' + now.seconds();
// //         console.log('then Time :'+ time_after)
// //         console.log("Time: "+ time)
// //         var Time1= time
// //         var Time2= time_after
// //         var a = [];
// //         let Fetch_time_data = "SELECT * FROM time WHERE time BETWEEN ? AND ? ";
// //         let query = connection.query(Fetch_time_data,[Time1,Time2],  (err, results) => {
// //             if (err) throw err;
// //             console.log(results);
// //             results.map((data) => {
// //                 console.log('data :'+ data.time)
// //                 a.push(data.time)
// //                 if(data == results[results.length -1]){
// //                     return a;
// //                 }
// //             });
            
            
// //         });
    
// // }




// const port = process.env.PORT || 3000;
// app.listen(port);
// });

var app = require('express')();
var http = require('http').Server(app);
// import { socket } from 'socket.io';
const cron = require('node-cron');
var io = require('socket.io')(http);
var moment = require('moment');
var mysql = require('mysql');

// var a = 'haan_hhhaj bhai';


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test_db",
    port:"3306"
})


app.get('/',function(rq,res){
    res.sendFile(__dirname +'/index.html');
});

connection.connect((err) => {
    if(err){
        throw err
    }
    else{
        console.log("connected")
        
        
        
    }
});

io.on('connection',function(socket){

    cron.schedule('1 * * * * *',function(req,res) {
        
  
    var now = moment();
        var then = moment().add(5,'minutes');
        var time_after = then.hour() + ':' + then.minutes() + ':' + then.seconds();
        var time = now.hour() + ':' + now.minutes() + ':' + now.seconds();
        console.log('then Time :'+ time_after)
        console.log("Time: "+ time)
        var Time1= time
        var Time2= time_after
        var a = [];
        let Fetch_time_data = "SELECT * FROM time WHERE time BETWEEN ? AND ? ";
        let query = connection.query(Fetch_time_data,[Time1,Time2],  (err, results) => {
            if (err) throw err;
            console.log(results);
            results.map((data) => {
                console.log('data :'+ data.time)
                a.push(data.time)
                if(data == results[results.length -1]){
                    return a;
                    console.log("a is : " + a)
                    
                }
                else{
                    console.log("else mai aagaya : " + a)
                    console.log('Connection added : '+ a)
                    socket.send(a)
                }
            });
            
            
        });

    // console.log('Connection added : '+ a)
    // socket.send(a)

    // setTimeout(function(){
    //     socket.send('Send meesge test kr raha mai');
    // },4000)

    socket.on('disconnect',function() {
        console.log('user left')
        });
    });
});


//cron_job_start

// cron.schedule('1 * * * * *',function(req,res) {
//     console.log("cron job running");  
// });



//cron_job_ends

http.listen(3000,function(){
    console.log('port on')
});