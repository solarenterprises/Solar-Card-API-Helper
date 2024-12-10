// services/currency/tokenService.mjs
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

const tokenService = {
    getAllTokens: async () => {
        try {
            const response = await kyInstance.get("currency/token");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Token Information");
        }
    },

    getAllTokensShort: async () => {
        try {
            const response = await kyInstance.get("currency/token/short");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Summary Token Information", error);
        }
    }
}


export default tokenService;