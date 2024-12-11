// services/blockchain-list/blockchainListService.mjs
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

const blockchainListService = {
    getBlockchainList: async () => {
        try {
            const response = await kyInstance.get("currency/blockchain");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Blockchain List", error);
        }
    }
}


export default blockchainListService;
