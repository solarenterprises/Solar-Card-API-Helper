// Load environment variables from the main project's .env file
import dotenv from 'dotenv';
dotenv.config();

// Configuration for SolarCardAPIHelper
export default {
    // General App Configuration
    PORT: process.env.PORT || 3000,
    SOCKET_PORT: process.env.SOCKET_PORT || 3001,
    JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',

    // MongoDB Configuration
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/solarcard',

    // API Configuration
    API_BASE_URL: process.env.API_BASE_URL || 'https://api.sandbox-v2.vault.ist',
    PARTNER_ID: process.env.PARTNER_ID || 13,
    PARTNER_NAME: process.env.PARTNER_NAME || 'dokdo',
    CLIENT_ID: process.env.CLIENT_ID || 'be704cf91b3e7f02e38795028cb87364',

    // Additional optional configurations (could be used for Socket.IO or others)
    SOCKET_IO: {
        URL: process.env.SOCKET_URL || 'http://localhost:3001',  // URL for Socket.IO server
        RECONNECT_INTERVAL: process.env.SOCKET_RECONNECT_INTERVAL || 1000,  // Socket reconnect interval
        MAX_RECONNECT_ATTEMPTS: process.env.SOCKET_MAX_RECONNECT_ATTEMPTS || 5,  // Max reconnections
    }
};
