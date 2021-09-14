const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

app.use('/public', express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/public/html/home.html')
})

app.get('/chat/',(req,res)=>{

  res.sendFile(__dirname+'/public/html/index.html')}
)


const users = {}

io.on('connection',socket=>{
    socket.on('new-user',name1=>{
        users[socket.id] = name1
        socket.broadcast.emit('user-connected',name1)
    })
    socket.on('send-chat-message',message=>{
        var obj = {name1:users[socket.id],message:message}
        socket.broadcast.emit('chat-message',obj)
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
      })
})

server.listen(process.env.PORT || 80)
