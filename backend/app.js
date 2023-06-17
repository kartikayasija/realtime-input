const express = require('express');
const socket = require('socket.io');
const { swaggerDocs } = require('./swagger.js');

const app = express();

// Define a sample GET endpoint with Swagger annotations
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *        - Server Running
 *     summary: Get server status
 *     description: Returns the status of the server.
 *     responses:
 *       200:
 *         description: Server is running.
 */

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is Running',
  });
});

const port = 3000;
const server = app.listen(port, () => {
  console.log('Server Started');
  swaggerDocs(app, port);
});

const io = new socket.Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
  },
});


/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Socket Connection
 *     summary: Connect to Socket
 *     description: Connection with Socket.io.
 *     parameters:
 *       - name: msg
 *         in: body
 *         description: The message to be sent.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       - name: check
 *         in: body
 *         description: The check value to be sent.
 *         required: true
 *         schema:
 *           type: array
 *           properties:
 *             checkValue:
 *               type: string
 *     responses:
 *       200:
 *         description: Connected to Socket.io.
 */

io.on('connection', async (socket) => {
  console.log('connected to Socket.io');
  socket.on('msg', (msg) => {
    io.emit('display', msg);
  });
  socket.on('check', (check) => {
    io.emit('checkArray', check);
  });
});

