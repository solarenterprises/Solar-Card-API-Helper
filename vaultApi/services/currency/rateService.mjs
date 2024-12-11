// services/currency/rateService.mjs
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

const rateService = {
    getRate: async () => {
        try {
            const response = await kyInstance.get("currency/rate");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Exchange Rate for Currency Pair", error);
        }
    }
}


export default rateService;
