import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import apiHelperController from './vaultApi/controllers/apiHelperController.mjs';
import dotenv from 'dotenv';
dotenv.config(); // This loads environment variables from the .env file into `process.env`


const app = express();
const server = createServer(app);
const io = new Server(server); // Initialize Socket.IO with the HTTP server

const port = process.env.PORT || 3000;

app.use(express.json());

// Define your routes
app.get('/vault-data', apiHelperController.getVaultData);

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for messages from the client
    socket.on('request-data', async () => {
        try {
            const data = await apiHelperController.getVaultData();  // You might need to adjust this call
            socket.emit('data-response', data);  // Send the data back to the client
        } catch (error) {
            socket.emit('data-error', { error: error.message });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
