// controllers/RegisterController.mjs
import vaultRegisterService from '../services/vaultRegisterService.mjs';
import mongoose from 'mongoose';
import User from '../models/User.mjs'; // Adjust path as needed
import config from '../config/config.mjs';

// const MONGO_URI = 'mongodb://localhost:27017/solarcard';

const RegisterController = {
    register: async (req, res) => {
        const { userType, email,firstName, lastName, password } = req.body; // Assuming request has this data
        const initialUserData = {
            userType,
            email,
            firstName,
            lastName,
            password,
        };

        const confirmUserData = {
            ...initialUserData,
            emailConfirmCode: '12345', // You may generate or handle the code dynamically
        };

        try {
            // Call the registration service
            // console.log(config.MONGO_URI);
            
            const response = await vaultRegisterService.registerUser(initialUserData, confirmUserData);
            
            console.log(response);
            
            // If registration is successful, save the user to MongoDB
            if (response.user_id) {
                await mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
                const newUser = new User({
                    email,
                    firstName,
                    lastName,
                    password,
                    userId: response.user_id,
                    createdAt: new Date(),
                });

                await newUser.save();
                console.log("===================================");
                
                console.log(newUser);
                
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
    getReqs:async (req, res) => {
        const userId = req.params.id;
        const token = req.headers['token'];
        console.log(token);
        
        try {
            // Call the registration service
            
            const response = await vaultRegisterService.getReqs(token, userId);
            
            console.log(response);

                res.status(200).json(response);
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateUser: async (req, res) => {
        const { userType,firstName,lastName, } = req.body; // Assuming request has this data
        const token = req.headers['token'];
        const initialUserData = {
            userType,
            firstName,
            lastName,
        };

        try {
            // Call the registration service
            
            const response = await vaultRegisterService.updateUser(token, initialUserData);
            
            console.log(response);
            const email = response.emails[0].email;
            const firstName = response.firstName;
            const lastName = response.lastName;
            // If registration is successful, save the user to MongoDB
            if (email) {

                await mongoose.connect(config.MONGO_URI);
                await User.findOneAndUpdate(
                    { email: email },
                    {
                        firstName:firstName,
                        lastName:lastName,
                    }
                );
                res.status(201).json({ message: 'User updated and saved to DB', userId: response.user_id });
            } else {
                res.status(400).json({ error: 'User updated failed' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            mongoose.connection.close();
        }
    },
};

export default RegisterController;
