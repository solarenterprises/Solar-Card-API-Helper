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
    // Function to retrieve the list of card offers
    getCardOfferList: async (token) => {
        try {
            const response = await kyInstance.get("card-holder/cardoffer", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Card Offer List", error);
        }
    },

    // Function to retrieve the list of card requests
    getCardRequestList: async (token) => {
        try {
            const response = await kyInstance.get("card-holder/cardrequest", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get List Card Requests", error);
        }
    },
    
    // Function to create a new card request
    createCardRequest: async (token, cardOfferId, accountId, preferredCardname, secondaryCardname, billingAddress, deliveryAddress, cardDesignId) => {
        try {
            // Construct the payload with optional fields
            const payload = {
                cardOfferId,
                ...(accountId && { accountId }),
                ...(preferredCardname && { preferredCardname }),
                ...(secondaryCardname && { secondaryCardname }),
                ...(billingAddress && { 
                    billingAddress: {
                        firstName: billingAddress.firstName,
                        lastName: billingAddress.lastName,
                        email: billingAddress.email,
                        phone: billingAddress.phone,
                        country: billingAddress.country,
                        postCode: billingAddress.postCode,
                        state: billingAddress.state,
                        town: billingAddress.town,
                        street: billingAddress.street,
                        subStreet: billingAddress.subStreet,
                        buildingName: billingAddress.buildingName,
                        flatNumber: billingAddress.flatNumber,
                        buildingNumber: billingAddress.buildingNumber,
                    }
                }),
                ...(deliveryAddress && { 
                    deliveryAddress: {
                        firstName: deliveryAddress.firstName,
                        lastName: deliveryAddress.lastName,
                        email: deliveryAddress.email,
                        phone: deliveryAddress.phone,
                        country: deliveryAddress.country,
                        postCode: deliveryAddress.postCode,
                        state: deliveryAddress.state,
                        town: deliveryAddress.town,
                        street: deliveryAddress.street,
                        subStreet: deliveryAddress.subStreet,
                        buildingName: deliveryAddress.buildingName,
                        flatNumber: deliveryAddress.flatNumber,
                        buildingNumber: deliveryAddress.buildingNumber,
                    }
                }),
                ...(cardDesignId && { cardDesignId }),
            };
            const response = await kyInstance.post(`card-holder/cardrequest`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                json: payload
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Create Card Request", error);
        }
    },

    // Function to retrieve transactions with optional filters
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

    // Function to retrieve the list of card offers (duplicate method)
    getCardOffersList: async (token) => {
        try {
            const response = await kyInstance.get("card-holder/cardholder/card", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get List Card Offers", error);
        }
    },

    // Function to reset the card PIN
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

    // Function to retrieve card limits
    getCardLimits: async (token, cardId) => {
        try {
            const response = await kyInstance.get(`card-holder/cardholder/card/${cardId}/limits`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Get Card Limits", error);
        }
    },

    updateCardLimits: async (token, cardId, transaction, daily, weekly, monthly, yearly, allTime) => {
        try {
            // Construct the payload with optional card limit parameters
            const payload = {
                ...(transaction && { transaction }),
                ...(daily && { daily }),
                ...(weekly && { weekly }),
                ...(monthly && { monthly }),
                ...(yearly && { yearly }),
                ...(allTime && { allTime }),
            };
    
            // Send a POST request to update card limits
            const response = await kyInstance.post(`card-holder/cardholder/card/${cardId}/limits`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                json: payload,
            });
    
            // Parse and return the response data
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating card limits:", error);
            throw new Error("Failed to update card limits.");
        }
    },

    updateCardType: async (token, cardId, cardType, firstName, lastName, email, phone, country, postCode, state, town, street, subStreet, buildingName, flatNumber, buildingNumber) => {
        try {
            // Construct the payload with card type and delivery address details
            const payload = {
                ...(cardType && { cardType }),
                deliveryAddress: {
                    ...(firstName && { firstName }),
                    ...(lastName && { lastName }),
                    ...(email && { email }),
                    ...(phone && { phone }),
                    ...(country && { country }),
                    ...(postCode && { postCode }),
                    ...(state && { state }),
                    ...(town && { town }),
                    ...(street && { street }),
                    ...(subStreet && { subStreet }),
                    ...(buildingName && { buildingName }),
                    ...(flatNumber && { flatNumber }),
                    ...(buildingNumber && { buildingNumber }),
                }
            };
    
            // Send a POST request to update card type
            const response = await kyInstance.post(`card-holder/cardholder/card/${cardId}/change-type`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                json: payload,
            });
    
            // Parse and return the response data
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating card type:", error);
            throw new Error("Failed to update card type.");
        }
    },

    updateCardStatus: async (token, cardId, requiredStatus) => {
        try {
            // Send a POST request to update card status with the required status
            const response = await kyInstance.post(`card-holder/cardholder/card/${cardId}/change-status?requiredStatus=${requiredStatus}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    
            // Parse and return the response data
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating card Status:", error);
            throw new Error("Failed to update card Status.");
        }
    },

    activateCard: async (token, cardId, activationCode) => {
        try {
            // Send a POST request to activate the card with the provided activation code
            const response = await kyInstance.post(`card-holder/cardholder/card/${cardId}/activate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                json: {
                    activationCode: activationCode
                },
            });
    
            // Parse and return the response data
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error activating card:", error);
            throw new Error("Failed to activate card.");
        }
    },

    getCardInformation: async (token, cardId) => {
        try {
            // Send a GET request to retrieve card information
            const response = await kyInstance.get(`card-holder/cardholder/card/${cardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Parse and return the response data
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error getting card:", error);
            throw new Error("Failed to get card.");
        }
    },

    getTopUpInformation: async (token, cardId) => {
        try {
            // Send a GET request to retrieve card top-up information
            const response = await kyInstance.get(`card-holder/cardholder/card/${cardId}/top-up-information`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Parse and return the response data
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error getting card top-up information:", error);
            throw new Error("Failed to get card top-up information.");
        }
    },

    getCardSensitiveDetails: async (token, cardId) => {
        try {
            // Send a GET request to retrieve card top-up information
            const response = await kyInstance.get(`card-holder/cardholder/card/${cardId}/sensitive-details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Parse and return the response data
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error getting card sensitive details information:", error);
            throw new Error("Failed to get card sensitive details information.");
        }
    },

    getCardPin: async (token, cardId) => {
        try {
            // Send a GET request to retrieve card pin information
            const response = await kyInstance.get(`card-holder/cardholder/card/${cardId}/pin`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Parse and return the response data
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error getting card pin:", error);
            throw new Error("Failed to get card pin.");
        }
    },

    getCardDetail: async (token, cardId) => {
        try {
            // Send a GET request to retrieve card details information
            const response = await kyInstance.get(`card-holder/cardholder/card/${cardId}/details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Parse and return the response data
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error getting card details:", error);
            throw new Error("Failed to get card details.");
        }
    },
}


export default cardService;
