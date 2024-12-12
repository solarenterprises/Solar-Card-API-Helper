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
    
    createCardRequest: async (token, cardOfferId, accountId,  preferredCardname,  secondaryCardname,  
        billingAddress,  deliveryAddress,cardDesignId) => {
        try {
            const payload = {
                cardOfferId,
                ...(accountId && { accountId }),
                ...(preferredCardname && { preferredCardname }),
                ...(secondaryCardname && { secondaryCardname }),
                ...(billingAddress && { billingAddress }),
                ...(deliveryAddress && { deliveryAddress }),
                ...(cardDesignId && { cardDesignId }),
            };
            const response = await kyInstance.post(`card-holder/cardrequest`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                },
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Create Card Request", error);
        }
    },

    getTransactions: async (token, cardId, status, startDate, endDate, size, page, sort) => {
        try {
            // Construct query parameters dynamically
            const queryParams = new URLSearchParams({
                cardId,
                ...(status && { status }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate }),
                ...(size && { size }),
                ...(page && { page }),
                ...(sort && { sort }),
            });
    
            // Make the request
            const response = await kyInstance.get(`card-holder/transaction?${queryParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Parse and return the JSON response
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching transactions:", error);
            throw new Error("Failed to fetch transactions.");
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

    resetCardPIN: async (token, cardId, pin, secretQuestion, secretQuestionAnswer) => {
        try {
            // Construct the payload dynamically
            const payload = {
                pin,
                ...(secretQuestion && { secretQuestion }),
                ...(secretQuestionAnswer && { secretQuestionAnswer })
            };
    
            const response = await kyInstance.post(`card-holder/cardholder/card/${cardId}/pin/reset`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                json: payload,
            });
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error resetting card PIN:", error);
            throw new Error("Failed to reset card PIN.");
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

    updateCardLimits: async (token, cardId, transaction, daily, weekly, monthly, yearly, allTime) => {
        try {
            // Construct the payload dynamically
            const payload = {
                ...(transaction && { transaction }),
                ...(daily && { daily }),
                ...(weekly && { weekly }),
                ...(monthly && { monthly }),
                ...(yearly && { yearly }),
                ...(allTime && { allTime }),
            };
    
            const response = await kyInstance.post(`card-holder/cardholder/card/${cardId}/limits`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                json: payload,
            });
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating card limits:", error);
            throw new Error("Failed to update card limits.");
        }
    },
}


export default cardService;
