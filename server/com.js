const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIO.listen(server);

app.use(express.static(__dirname + '/public'));
server.listen(3000, () => console.log('server on port 3000'));

var SerialPort = require('serialport')
var Readline = SerialPort.parsers.Readline;
SerialPort.list().then(function(ports){
    ports.forEach(function(port){
        console.log(port.comName);

        var serialPort = new SerialPort(port.comName,{
            baudRate: 9600
        });

        var parser = serialPort.pipe(new Readline({ delimeter: '\r\n ' }));
        
        parser.on('open', function() {
            console.log('connection is opened ' + port.comName);
        });

        parser.on('data', function(data){
            io.emit('letra', data);
        });
    })
},
  err => console.error(err)
)