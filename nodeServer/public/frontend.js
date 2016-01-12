//HTML FRONTEND

var socket = io('http://localhost:3001');

socket.emit('message', { msg: 'frontend client connected' });

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});


onload = function() {
  console.log("loaded.")
  $("#controlleft").click( function () {
    console.log("left")
    socket.emit('message', { msg: 'left' });
  })

  $("#controlright").click( function () {
    console.log("right")
    socket.emit('message', { msg: 'right' });
  })
};
