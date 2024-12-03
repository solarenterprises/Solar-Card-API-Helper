import vaultService from '../services/vaultService.mjs';

const apiHelperController = {
    getVaultData: async () => {
        try {
            const data = await vaultService.fetchData('/endpoint'); // Use the actual Vault API endpoint here
            return data;
        } catch (error) {
            throw new Error('Failed to fetch data from Vault API: ' + error.message);
        }
    }
};

export default apiHelperController;
