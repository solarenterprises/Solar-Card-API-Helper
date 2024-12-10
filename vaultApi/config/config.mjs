// config/config.mjs
import dotenv from 'dotenv';
// Load environment variables from the main project's .env file
dotenv.config();

export default {
    API_BASE_URL: process.env.API_BASE_URL,
    CURRENCY_API_URL: process.env.CURRENCY_API_URL,
    PARTNER_ID: process.env.PARTNER_ID,
    PARTNER_NAME: process.env.PARTNER_NAME,
    CLIENT_ID: process.env.CLIENT_ID,
    SOCKET_PORT: process.env.SOCKET_PORT,
    MONGO_URI: process.env.MONGO_URI,
};
