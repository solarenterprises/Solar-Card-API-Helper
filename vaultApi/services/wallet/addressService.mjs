// services/wallet/addressService.mjs
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

const addressService = {
    getAddressDetailList: async (token, accountId, addressIndex, blockchain, currency) => {

        const queryParams = new URLSearchParams();
        queryParams.append("accountId", accountId);
        if(addressIndex) queryParams.append("addressIndex", addressIndex);
        queryParams.append("blockchain", blockchain);
        queryParams.append("currency", currency);


        try {

            const response = await kyInstance.put(`wallet/v2/address/list/${queryParams.toString()}`,
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
            throw new Error("List Address Details");
        }
    },
}


export default addressService;
