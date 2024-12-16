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
    getAccountBalances: async (token, accountId, accountIds, currency, byDate) => {

        const queryParams = new URLSearchParams();
        if(accountId) queryParams.append("accountId", accountId);
        if(accountIds) accountIds.split(",").forEach(_accountId => {
            queryParams.append("accountIds", _accountId);
        });
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

    getPagedBalance: async (token, accountIds, currency, from, to, direction, reasonType, search, page, size) => {

        const queryParams = new URLSearchParams();
        if(accountIds) accountIds.split(",").forEach(accountId => {
            queryParams.append("accountIds", accountId);
        });

        if(currency) queryParams.append("currency", currency);      
        if(from) queryParams.append("from", from);      
        if(to) queryParams.append("to", to);      
        if(direction) queryParams.append("direction", direction);      
        if(reasonType) queryParams.append("reasonType", reasonType);      
        if(search) queryParams.append("search", search);      
        if(page) queryParams.append("page", page);      
        if(size) queryParams.append("size", size);      

        try {
            const response = await kyInstance.get(`wallet/balance/log?${queryParams.toString()}`,
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
            throw new Error("Get Paged Balance Log");
        }
    },

    getBalanceLogById: async (token, logId) => {

        try {
            const response = await kyInstance.get(`wallet/balance/log/${logId}`,
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
            throw new Error("Get balance log receipt");
        }
    },
}


export default balanceService;
