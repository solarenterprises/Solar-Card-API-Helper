// controllers/PasswordForgotController.mjs
import vaultPassforgotService from '../services/vaultPassforgotService.mjs';
import mongoose from 'mongoose';
import User from '../models/User.mjs'; // Adjust path as needed

const passForgotController = {
    register: async (req, res) => {
       

        try {
            // Call the registration service
            const response = await vaultPassforgotService.registerUser(initialUserData, confirmUserData);

            
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            mongoose.connection.close();
        }
    },


};

export default passForgotController;
