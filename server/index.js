const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIO.listen(server);
const mysqlConnection = require('./public/Conexion.js');

//variables para los sensores
var humedad;
var temp; 
var mg; 
var mq1; 
var mq2;


app.use(express.static(__dirname + '/public'));
server.listen(3000, () => console.log('server on port 3000'));

// Serial Comunications COM12
const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;

const port = new Serialport('COM12', {
    baudRate: 9600 //serial begin
});

const port2 = new Serialport('COM3', {
    baudRate: 9600 //serial begin
});

var parser = port.pipe(new Readline({ delimeter: '\r\n ' }));

parser.on('open', function() {
    console.log('connection is opened COM12');
});

parser.on('data', function(data) {
    
    io.emit('letra', data);

     humedad = data.substr(8, 4);//7:13
     temp = data.substr(26,4); //29:47
     mg = data.substr(67, 4); //62:66

});

parser = port2.pipe(new Readline({ delimeter: '\r\n ' }));

parser.on('open', function() {
    console.log('connection is opened COM12');
});

parser.on('data', function(data) {
    io.emit('letra2', data);

    mq1 = data.substr(96, 4);
    mq2 = data.substr(117, 5);
    
    mysqlConnection.connect(function(err) {
        /* if (err) throw err; */
        var sql = "INSERT INTO sensores (temperatura, humedad, mq1, mq2, mg) VALUES (?,?,?,?,?)";
        mysqlConnection.query(sql, [temp, humedad, mq1, mq2, mg], function(err, result) {
            if (err) throw err;
        });
    });
});