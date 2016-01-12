var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Serve up public/ftp folder
var serve = serveStatic('public', {'index': ['index.html', 'index.htm']})

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
})


var io = require('socket.io')(3001);

io.on('connection', function (socket) {

  socket.on('message', function (data) {
    console.log(data);
    socket.broadcast.emit('message', data);
  });

  socket.on('message', function () { 

  });
  socket.on('disconnect', function () { });
});

// Listen
server.listen(3000)