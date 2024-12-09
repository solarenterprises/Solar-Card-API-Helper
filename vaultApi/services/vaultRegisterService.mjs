// services/vaultRegisterService.mjs
import ky from 'ky';
import config from '../config/config.mjs';

// Initialize ky instance
const kyInstance = ky.create({
    prefixUrl: 'https://api.sandbox-v2.vault.ist',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        partnerId: 13,
    },
});

// Function for registering the partner user
const vaultRegisterService = {

    registerUser: async (initialUserData, confirmUserData) => {
        try {
            console.log("==========================");
            console.log(initialUserData);
            console.log(kyInstance.prefixUrl);
            console.log(kyInstance.head.partnerId);
            console.log("==========================");

            // Step 1: Send initial registration request without emailConfirmCode
            const initialResponse = await kyInstance.post('reg/user', {
                json: initialUserData,
                throwHttpErrors: false,
            });
            
            console.log(initialResponse.status);
            console.log("==========================");
            

            if (initialResponse.status === 202) {
                // Delay before sending confirmation request
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Step 2: Send confirmation request with emailConfirmCode
                const confirmResponse = await kyInstance.post('reg/user', {
                    json: confirmUserData,
                    throwHttpErrors: false,
                });
                console.log(confirmResponse.status);

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

    getReqs: async (token, userId) => {
        try {
            
            const kyInstanceWithAuth = kyInstance.extend({
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

            const initialResponse = await kyInstanceWithAuth.get(`reg/user/${userId}`);

            console.log("=============================");
            console.log(initialResponse);
            console.log(initialResponse.status);
            console.log("=============================");

            const initialResponseBody = await initialResponse.json();
            if (initialResponse.status === 200) {

                console.log("=============================");
                console.log(initialResponseBody);
                console.log("=============================");

                return initialResponseBody;
            } else {
                throw new Error('Failed to get groups');
            }
        } catch (error) {
            throw new Error(`Get Groups error: ${error.message}`);
        }
    },

    updateUser: async (token, userType) => {
        try {
            console.log("==========================");
            console.log(token);
            console.log(userType);
            console.log("==========================");
            const kyInstanceWithAuth = kyInstance.extend({
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

            const initialResponse = await kyInstanceWithAuth.patch(`reg/user/info`, {
                json: {"userType": userType},
                throwHttpErrors: false,
            });
            
            console.log(initialResponse.status);
            console.log("==========================");
            const initialResponseBody = await initialResponse.json();
            if (initialResponse.status === 200) {
                return initialResponseBody;
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            throw new Error(`Update error: ${error.message}`);
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
            const response = await kyInstance.post('/reg/verification', {
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
            const response = await kyInstance.get(`/reg/verification/${userId}`, {
                throwHttpErrors: false,
            });
            
            return await response.json();
        } catch (error) {
            throw new Error(`SUMSUB status check error: ${error.message}`);
        }
    },


    
};

export default vaultRegisterService;
