// services/wallet/balanceService.mjs
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

const balanceService = {
    getAccountBalances: async (token, accountId, currency, byDate) => {

        const queryParams = new URLSearchParams();
        if(accountId) queryParams.append("accountId", accountId);
        if(currency) queryParams.append("currency", currency);
        if(byDate) queryParams.append("byDate", byDate);
        

        try {

            const response = await kyInstance.get(`wallet/balance?${queryParams.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Get account balance");
        }
    },

    touchBalanceForCurrency: async (token, accountId, currency) => {

        const queryParams = new URLSearchParams();
        queryParams.append("accountId", accountId);
        queryParams.append("currency", currency);      

        try {

            const response = await kyInstance.post(`wallet/balance?${queryParams.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Touch Balance for Currency");
        }
    },
}


export default balanceService;
