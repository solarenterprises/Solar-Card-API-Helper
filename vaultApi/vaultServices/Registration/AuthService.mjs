// services/vaultRegisterService.mjs
import ky from 'ky';
import config from '../../config/config.mjs';

// Initialize ky instance
const kyInstance = ky.create({
    // prefixUrl: 'https://api.sandbox-v2.vault.ist',
    prefixUrl: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        partnerId: config.CLIENT_ID,
        // partnerId: 13,
    },
});

// Function for registering the partner user
const vaultAuthService = {

    OAuthToken: async (confirmData) => {
        try {

            // Step 1: Send initial registration request without emailConfirmCode
            const initialResponse = await kyInstance.post('reg/auth/token', {
                json: confirmData,
                throwHttpErrors: false,
            });
            
            console.log(initialResponse.status);
            console.log("==========================");

            const initialResponseBody = await initialResponse.json();
            if (initialResponse.status === 200) {
                return initialResponseBody;
            } else {
                throw new Error('Failed to confirm user');
            }
           
        } catch (error) {
            throw new Error(`Registration error: ${error.message}`);
        }
    },

    
};

export default vaultAuthService;
