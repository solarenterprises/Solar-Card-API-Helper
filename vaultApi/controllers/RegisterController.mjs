// controllers/RegisterController.mjs
import vaultRegisterService from '../services/vaultRegisterService.mjs';
import mongoose from 'mongoose';
import User from '../models/User.mjs'; // Adjust path as needed

const RegisterController = {
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
            const response = await vaultRegisterService.registerUser(initialUserData, confirmUserData);

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
    verifyPhone: async (req, res) => {
        try {
            const { userId, phoneNumber, verificationCode } = req.body;
            const response = await vaultRegisterService.verifyPhoneNumber(userId, phoneNumber, verificationCode);
            
            if (response.success) {
                await User.findOneAndUpdate(
                    { userId },
                    { phoneNumber, isPhoneVerified: true }
                );
                res.status(200).json({ message: 'Phone verified successfully' });
            } else {
                res.status(400).json({ error: 'Phone verification failed' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    initKYC: async (req, res) => {
        try {
            const { userId } = req.body;
            const response = await vaultRegisterService.initSumsubVerification(userId);
            
            await User.findOneAndUpdate(
                { userId },
                { 
                    kycStatus: 'IN_PROGRESS',
                    sumsubApplicantId: response.applicantId
                }
            );
            
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createVerification: async (req, res) => {
        try {
            const verificationData = {
                userId: req.body.userId,
                type: 'SUMSUB',
                // Add other required SUMSUB parameters
            };
            const response = await vaultRegisterService.createVerification(verificationData);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

};

export default RegisterController;
