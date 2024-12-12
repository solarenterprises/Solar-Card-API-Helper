// services/card/cardService.mjs
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

const cardService = {
    getCardOfferList: async (token) => {
        try {
            const response = await kyInstance.get("card-holder/cardoffer",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Card Offer List", error);
        }
    },

    getCardRequestList: async (token) => {
        try {
            const response = await kyInstance.get("card-holder/cardrequest",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get List Card Requests", error);
        }
    },
    
    createCardRequest: async (token, cardOfferId) => {
        try {
            const response = await kyInstance.get(`card-holder/cardrequest`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: {
                        cardOfferId: cardOfferId
                    }
                },
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Create Card Request", error);
        }
    },

    getTransactions: async (token, cardId) => {
        try {
            const response = await kyInstance.get(`card-holder/transaction?cardId=${cardId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get List Card Requests", error);
        }
    },

    getCardOffersList: async (token) => {
        try {
            const response = await kyInstance.get("card-holder/cardholder/card",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get List Card Offers", error);
        }
    },

    resetCardPIN: async (token, cardId, pin) => {
        try {
            const response = await kyInstance.get(`card-holder/cardholder/card/${cardId}/pin/reset`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: {
                        pin: pin
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Reset Card PIN", error);
        }
    },

    getCardLimits: async (token, cardId) => {
        try {
            const response = await kyInstance.get(`card-holder/cardholder/card/${cardId}/limits`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Card Limits", error);
        }
    },
}


export default cardService;
