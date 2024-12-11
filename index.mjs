import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import tokenController from './vaultApi/controllers/currency/tokenController.mjs';
import accountController from './vaultApi/controllers/currency/accountController.mjs';
import RegisterController from './vaultApi/controllers/Registration/RegisterController.mjs';
import AuthController from './vaultApi/controllers/Registration/AuthController.mjs';
import blockchainListController from './vaultApi/controllers/blockchain-list/blockchainListController.mjs';
import dotenv from 'dotenv';
dotenv.config(); // This loads environment variables from the .env file into `process.env`


const app = express();
const server = http.createServer(app);
const io = new Server(server); // Initialize Socket.IO with the HTTP server

const port = process.env.PORT || 3000;

app.use(express.json());

// Define your routes
app.get('/', ()=>{
    console.log('hello');
})

app.get("/all-tokens", tokenController.getAllTokens);
app.get("/short-all-tokens", tokenController.getAllTokensShort);
app.get("/preferred-currencies", accountController.getPreferredCurrencies);
app.post("/preferred-currencies", accountController.setPreferredCurrencies);
app.get("/blockchain-list", blockchainListController.getBlockchainList);

//Registration-register
app.post('/reg/user', RegisterController.register);
// app.get('/reg/user/groups', RegisterController.getGroups);
app.get('/reg/user/:id', RegisterController.getReqs);
app.patch('/reg/user/info', RegisterController.updateUser);

//Registration-Auth
app.post('/reg/auth/token', AuthController.OAuthToken);



// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for messages from the client
    socket.on('request-data', async () => {
        try {
            // const data = await apiHelperController.getVaultData();  // You might need to adjust this call
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
