// services/bank/bankService.mjs
import ky from 'ky';
import config from '../../config/config.mjs';

// Initialize ky instance
const kyInstance = ky.create({
    prefixUrl: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        partnerId: config.PARTNER_ID,
    },
});

const bankService = {

    gerUserBankAccount: async (token, accountId, status) => {
        
        const queryParams = new URLSearchParams({
            ...(accountId && { accountId }),
            ...(status && { status })
        });

        try {
            const response = kyInstance.get(`bank/bank-account/${queryParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw new Error("Getting bank account");
        }
    }
}

export default bankService