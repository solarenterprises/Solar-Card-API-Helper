// services/vaultService.mjs
import ky from 'ky';
import config from '../config/config.mjs';

// Initialize ky instance
const kyInstance = ky.create({
    prefixUrl: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        partnerId: config.PARTNER_ID,
    },
});

// Function for registering the partner user
const vaultService = {
    registerUser: async (initialUserData, confirmUserData) => {
        try {
            // Step 1: Send initial registration request without emailConfirmCode
            const initialResponse = await kyInstance.post('reg/user', {
                json: initialUserData,
                throwHttpErrors: false,
            });

            if (initialResponse.status === 202) {
                // Delay before sending confirmation request
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Step 2: Send confirmation request with emailConfirmCode
                const confirmResponse = await kyInstance.post('reg/user', {
                    json: confirmUserData,
                    throwHttpErrors: false,
                });

                const confirmResponseBody = await confirmResponse.json();
                if (confirmResponse.status === 201) {
                    return confirmResponseBody;
                } else {
                    throw new Error('Failed to confirm user');
                }
            } else {
                throw new Error('Initial registration failed');
            }
        } catch (error) {
            throw new Error(`Registration error: ${error.message}`);
        }
    },
    verifyPhoneNumber: async (userId, phoneNumber, verificationCode) => {
        try {
            const response = await kyInstance.post('reg/user/phone', {
                json: {
                    userId,
                    phoneNumber,
                    verificationCode
                },
                throwHttpErrors: false,
            });
            
            return await response.json();
        } catch (error) {
            throw new Error(`Phone verification error: ${error.message}`);
        }
    },

    // Add SUMSUB verification
    initSumsubVerification: async (userId) => {
        try {
            const response = await kyInstance.post('kyc/sumsub/init', {
                json: { userId },
                throwHttpErrors: false,
            });
            
            return await response.json();
        } catch (error) {
            throw new Error(`SUMSUB initialization error: ${error.message}`);
        }
    },

    checkSumsubStatus: async (userId) => {
        try {
            const response = await kyInstance.get(`kyc/sumsub/status/${userId}`, {
                throwHttpErrors: false,
            });
            
            return await response.json();
        } catch (error) {
            throw new Error(`SUMSUB status check error: ${error.message}`);
        }
    },
    createVerification: async (userData) => {
        try {
            const response = await kyInstance.post('verification', {
                json: userData,
                throwHttpErrors: false,
            });
            return await response.json();
        } catch (error) {
            throw new Error(`Verification error: ${error.message}`);
        }
    },

    
};

export default vaultService;
