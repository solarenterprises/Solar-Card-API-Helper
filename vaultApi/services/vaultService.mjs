import config from '../config/config.mjs';
import Ky from 'ky';

const kyInstance = Ky.create({
    prefixUrl: config.API_BASE_URL, // Use API_BASE_URL from the config
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}` // API key can be stored in .env if needed
    },
    timeout: 5000  // Default timeout, can be configured further
});

const vaultService = {
    fetchData: async (endpoint) => {
        try {
            const response = await kyInstance.get(endpoint).json();
            return response;
        } catch (error) {
            throw new Error('Failed to fetch data from Vault API: ' + error.message);
        }
    }
};

export default vaultService;
