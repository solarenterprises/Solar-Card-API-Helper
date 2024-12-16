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

    getUserBankAccount: async (token, accountId, status) => {
        
        const queryParams = new URLSearchParams();
        if(accountId) queryParams.append("account_id", accountId);
        if(status) queryParams.append("status", status);

        try {
            const response = kyInstance.get(`bank/bank-account?${queryParams.toString()}`, {
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
    },

    createUserBankAccount: async (token, accountId, currency) => {
        
        const queryParams = new URLSearchParams();
        if(accountId) queryParams.append("account_id", accountId);
        if(currency) queryParams.append("currency", currency);


        try {
            const response = kyInstance.post(`bank/bank-account?${queryParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw new Error("Creating bank account");
        }
    },

    getUserBankAccountByUuid: async (token, uuid) => {
        try {
            const response = kyInstance.get(`bank/bank-account/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw new Error("Get Bank Account by UUID");
        }
    },

    deleteBankAccountByUuid: async (token, uuid) => {
        try {
            const response = kyInstance.delete(`bank/bank-account/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw new Error("Delete Bank Account by UUID");
        }
    },

}

export default bankService