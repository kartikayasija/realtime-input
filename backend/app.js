const express = require('express');
const socket = require('socket.io');

const app = express();

app.get('/',(req,res)=>{
  res.status(200).json({
    message: 'Server is Running'
  })
})

const server = app.listen(3000,()=>{
  console.log('Server Started')
})

const io = new socket.Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST']
  }
});

io.on('connection',async(socket)=>{
  console.log('connected to Socket.io');
  socket.on('msg',(msg)=>{
    io.emit('display',msg)
  })
  socket.on('check',(check)=>{
    io.emit('checkArray',check);
  })
})