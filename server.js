const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend files from public folder
app.use(express.static('public'));

// Socket.IO handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for messages from client
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);  // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
