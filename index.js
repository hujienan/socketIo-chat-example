var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    socket.on('user online', function (nickname) {
      socket.nickname = nickname;
      socket.broadcast.emit('chat message', nickname+" is connected!")
    });
    socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('disconnect', function() {
      socket.broadcast.emit('chat message', socket.nickname + " is disconnected");
    });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});