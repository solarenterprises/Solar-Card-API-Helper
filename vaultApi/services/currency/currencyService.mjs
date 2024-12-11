// services/currency/currencyService.mjs
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

const currencyService = {
    getAllCurrencies: async () => {
        try {
            const response = await kyInstance.get("currency/currency");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get All Currencies", error);
        }
    },

    getCurrencyBySlug: async (slug) => {
        try {
            const response = await kyInstance.get(`currency/currency/slug/${slug}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Currency by Slug", error);
        }
    },

    getShortCurrencyList: async () => {
        try {
            const response = await kyInstance.get("currency/currency/short");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Short Currency List", error);
        }
    },

    getCurrencyByName: async (currencyName) => {
        try {
            const response = await kyInstance.get(`currency/currency/name/${currencyName}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Currency by Name", error);
        }
    },


}


export default currencyService;
