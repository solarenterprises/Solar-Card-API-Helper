// services/currency/accountService.mjs
import ky from 'ky';
import config from '../../config/config.mjs';

// Initialize ky instance
const kyInstance = ky.create({
    prefixUrl: config.CURRENCY_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        partnerId: config.PARTNER_ID,
    },
});

const accountService = {
    getPreferredCurrencies: async (accountId, token) => {
        try {
            const response = await kyInstance.get(`currency/preferred/${accountId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get preferred currencies", error);
        }
    },

    setPreferredCurrencies: async (accountId, token) => {
        try {
            const response = await kyInstance.post(`currency/preferred/${accountId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get preferred currencies", error);
        }
    }
}


export default accountService;
