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
    getRate: async (fromCurrency, toCurrency, amount) => {
        try {
            const response = await kyInstance.get(`currency/rate?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Exchange Rate for Currency Pair", error);
        }
    }
}


export default rateService;
