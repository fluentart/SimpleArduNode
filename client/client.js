var moment = require('moment');
  var socket = require('socket.io-client')('http://localhost:3001');

  socket.on('message', function(data) {
  	console.log(data.msg)
  	
  	if (data.msg == "left") {
	  	var ardumsg = { motorA: "0.0" }
	  	var ardumsgjson = JSON.stringify(ardumsg);
	  	arduino.write(ardumsgjson);
  	}

	if (data.msg == "right") {
	  	var ardumsg = { motorA: "1.0" }
	  	var ardumsgjson = JSON.stringify(ardumsg);
	  	arduino.write(ardumsgjson);
  	}

  })

  socket.emit('message', { msg: 'hardware client connected' });

/* ====================================== */

var SerialPort = require("serialport"); // so we can access the serial port
var scraper = require('json-scrape')(); // cleans messy serial messages.

var arduino;

//LIST DEVICES/AUTODETECT
SerialPort.list( function (err, ports) {
	console.log(moment().format()+" Autodetecting Arduino devices...")
  for (var num in ports) {
    console.log(ports[num]);
    if (ports[num].serialNumber == '75338323635351709112') {
    	console.log(moment().format()+" Arduino detected on "+ports[num].comName)
    	arduino = new SerialPort.SerialPort(ports[num].comName, {baudrate: 9600}); //you must set the port and baudrate
    	arduConnect(arduino);
    }
  }
});


var arduConnect = function (device) {
	ready = 1;
  	device.on("data", datahandler);
}

var datahandler = function (data) {
  scraper.write(data); 
}

scraper.on('data', function (data) {
  console.log(data)   
  //io.sockets.emit("arduino", data)
});

