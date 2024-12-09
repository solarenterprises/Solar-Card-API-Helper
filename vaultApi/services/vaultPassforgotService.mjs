// services/vaultPassforgotService.mjs
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
const vaultPassforgotService = {
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
    
};

export default vaultPassforgotService;
