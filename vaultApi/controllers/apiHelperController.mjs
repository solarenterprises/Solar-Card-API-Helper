// controllers/apiHelperController.mjs
import vaultService from '../services/vaultService.mjs';
import mongoose from 'mongoose';
import User from '../models/User.mjs'; // Adjust path as needed

const apiHelperController = {
    register: async (req, res) => {
        const { userType, email, password } = req.body; // Assuming request has this data
        const initialUserData = {
            userType,
            email,
            password,
        };

        const confirmUserData = {
            ...initialUserData,
            emailConfirmCode: '12345', // You may generate or handle the code dynamically
        };

        try {
            // Call the registration service
            const response = await vaultService.registerUser(initialUserData, confirmUserData);

            // If registration is successful, save the user to MongoDB
            if (response.user_id) {
                await mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
                const newUser = new User({
                    email,
                    password,
                    userId: response.user_id,
                    createdAt: new Date(),
                });

                await newUser.save();
                res.status(201).json({ message: 'User registered and saved to DB', userId: response.user_id });
            } else {
                res.status(400).json({ error: 'User registration failed' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            mongoose.connection.close();
        }
    },
};

export default apiHelperController;
