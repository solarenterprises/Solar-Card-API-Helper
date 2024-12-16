// services/currency/accountService.mjs
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

const accountService = {
    createWalletAccount: async (token, shortName, accountType, currency, blockchain) => {
        try {
            const queryParams = new URLSearchParams();
            if(shortName) queryParams.append("shortName", shortName);
            if(accountType) queryParams.append("accountType", accountType);
            if(currency) queryParams.append("currency", currency);
            if(blockchain) queryParams.append("blockchain", blockchain);

            const response = await kyInstance.post(`wallet/account?${queryParams.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw new Error("Create Account");
        }
    },

    getWalletAccountById: async (token, accountId) => {
        try {
            const response = await kyInstance.get(`wallet/account/${accountId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw new Error("Get account by id");
        }
    },

    updateWalletAccountById: async (token, accountId, account, accountType, shortName, currency, blockchain) => {
        try {
            const payload = {
                account: account,
                accountType: accountType,
                shortName: shortName,
            }

            if (currency) payload.currency = currency;
            if (blockchain) payload.blockchain = blockchain;

            const response = await kyInstance.put(`wallet/account/${accountId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Update account by id");
        }
    },
}


export default accountService;
