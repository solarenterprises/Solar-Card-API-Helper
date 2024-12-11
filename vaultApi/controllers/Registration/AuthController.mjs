// controllers/RegisterController.mjs
import vaultAuthService from '../../services/Registration/AuthService.mjs';
import mongoose from 'mongoose';
import Token from '../../models/Token.mjs'; // Adjust path as needed
import config from '../../config/config.mjs';

// const MONGO_URI = 'mongodb://localhost:27017/solarcard';

const AuthController = {
    OAuthToken: async (req, res) => {
        const { grant_type, refresh_token, username, password } = req.body; // Assuming request has this data
        const initialData = {
            grant_type,
            refresh_token,
            username,
            password,

        };

        const confirmData = {
            ...initialData,
            client_id: config.CLIENT_ID,
             // You may generate or handle the code dynamically
        };

        try {
            // Call the registration service
            console.log(confirmData);
            
            const response = await vaultAuthService.OAuthToken(confirmData);
            
            console.log(response);
            
            // If registration is successful, save the user to MongoDB
            if (response.user_id) {
                await mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
                const newToken = new Token({
                    userId: response.user_id, // Unique user identifier
                    accessToken: response.access_token,
                    token_type: response.token_type,
                    refreshToken: response.refresh_token,
                    scope: response.scope,
                    tokenExpiry: response.expires_in
                });

                await newToken.save();
                console.log("===================================");
                
                console.log(newToken);
                
                res.status(200).json({ message: 'Token Authorized and saved to DB', ...response });
            } else {
                res.status(400).json({ error: 'Token Authorization failed' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            mongoose.connection.close();
        }
    },

};

export default AuthController;
