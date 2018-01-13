const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


function onConnection(socket){
  socket.on('ping', (data) => socket.broadcast.emit('ping', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));