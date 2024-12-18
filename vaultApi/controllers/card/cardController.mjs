// controllers/card/cardController.mjs
import cardService from "../../services/card/cardService.mjs";

const cardController = {
    // Controller method to get the list of card offers
    getCardOfferList: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardOffers = await cardService.getCardOfferList(token); // Fetch card offers using the service
            res.status(200).json({data: cardOffers}); // Respond with the card offers data
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },

    // Controller method to get the list of card requests
    getCardRequestList: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardRequests = await cardService.getCardRequestList(token); // Fetch card requests using the service
            res.status(200).json({data: cardRequests}); // Respond with the card requests data
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },

    // Controller method to create a new card request
    createCardRequest: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const {
                cardOfferId,
                accountId,
                preferredCardname,
                secondaryCardname,
                billingAddress,
                deliveryAddress,
                cardDesignId
            } = req.body; // Extract necessary fields from the request body
            
            if(!cardOfferId) {
                // Return 404 if cardOfferId is missing
                return res.status(404).json({ result: "failed", message: "CardOfferId is missing." });
            }

            const cardRequest = await cardService.createCardRequest(token, cardOfferId, accountId, preferredCardname, secondaryCardname,  
                    billingAddress, deliveryAddress, cardDesignId); // Create card request using the service
            res.status(200).json({data: cardRequest}); // Respond with the created card request data
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },

    // Controller method to get transactions for a card
    getTransactions: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const { cardId, status, startDate, endDate, size, page, sort } = req.query; // Extract query parameters

            // Validate required parameters
            if (!cardId) {
                // Return 400 if cardId is missing
                return res.status(400).json({ result: "failed", message: "Card ID is required." });
            }

            const transactions = await cardService.getTransactions(token, cardId, status, startDate, endDate, size, page, sort); // Fetch transactions using the service
            res.status(200).json({data: transactions}); // Respond with the transactions data
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },

    // Controller method to get the list of card offers (duplicate method)
    getCardOffersList: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardOffers = await cardService.getCardOffersList(token); // Fetch card offers using the service
            res.status(200).json({data: cardOffers}); // Respond with the card offers data
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },
    
    // Controller method to reset card PIN
    resetCardPIN: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardId = req.params.card_id;
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }
            const {pin, secretQuestion, secretQuestionAnswer} = req.body; // Extract necessary fields from the request body

            if(!pin) {
                return res.status(400).json({ result: "failed", message: "Pin is required." });
            }

            const resetPIN = await cardService.resetCardPIN(token, cardId, pin, secretQuestion, secretQuestionAnswer); // Reset card PIN using the service
            res.status(200).json({data: resetPIN}); // Respond with the reset PIN data
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },

    // Controller method to get card limits
    getCardLimits: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardId = req.params.card_id; // Extract card ID from request parameters
            
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }
            const card = await cardService.getCardLimits(token, cardId); // Fetch card limits using the service
            res.status(200).json({data: card}); // Respond with the card limits data
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },

    // Controller method to update card limits
    updateCardLimits: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            const cardId = req.params.card_id; // Extract card ID from request parameters
            
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }

            const { transaction, daily, weekly, monthly, yearly, allTime } = req.body; // Extract necessary fields from the request body
            const card = await cardService.updateCardLimits(token, cardId, transaction, daily, weekly, monthly, yearly, allTime); // Update card limits using the service
            res.status(200).json({data: card}); // Respond with the updated card limits data
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },

    // Controller method to update the card type
    updateCardType: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardId = req.params.card_id; // Extract card ID from request parameters
            
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }

            // Extracting necessary fields from the request body
            const { cardType, firstName, lastName, email, phone, country, postCode, state, town, street, subStreet, buildingName, flatNumber, buildingNumber } = req.body;
                        
            if(!cardType) {
                return res.status(400).json({ result: "failed", message: "Card type is required." });
            }

            const card = await cardService.updateCardType(token, cardId, cardType, firstName, lastName, email, phone, country, postCode, state, town, street, subStreet, buildingName, flatNumber, buildingNumber);
            res.status(200).json({data: card});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

    // Controller method to update the card status
    updateCardStatus: async (req, res) => {
        try {
            const REQUIRED_STATUS = ["INIT", "PENDING", "ISSUED", "ACTIVE", "FROZEN", "LOST", "STOLEN", "INACTIVE", "CLOSED", "REJECTED"];
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            const cardId = req.params.card_id; // Extract card ID from request parameters
            
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }

            const requiredStatus = req.query.requiredStatus;
            
            // Validate the requiredStatus against predefined statuses
            if(!REQUIRED_STATUS.includes(requiredStatus)) {
                return res.status(400).json({ result: "failed", message: "REQUIRED_STATUS type error" });
            }

            const card = await cardService.updateCardStatus(token, cardId, requiredStatus);
            res.status(200).json({data: card});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

    // Controller method to activate a card
    activateCard: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            const cardId = req.params.card_id; // Extract card ID from request parameters
            
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }

            const activationCode = req.body.requiredStatus;

            if(!activationCode) {
                return res.status(400).json({ result: "failed", message: "Activation Code is required." });
            }
            
            const card = await cardService.activateCard(token, cardId, activationCode);
            res.status(200).json({data: card});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

    // Controller method to get card information
    getCardInformation: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            // Extracting cardId from the request parameters
            const cardId = req.params.card_id;

            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }

            const card = await cardService.getCardInformation(token, cardId);
            res.status(200).json({data: card});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

    // Controller method to get top-up information
    getTopUpInformation: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            // Extracting cardId from the request parameters
            const cardId = req.params.card_id;            
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }
            
            const topUp = await cardService.getTopUpInformation(token, cardId);
            res.status(200).json({data: topUp});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

    // Controller method to get sensitive details information
    getCardSensitiveDetails: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            // Extracting cardId from the request parameters
            // Extracting cardId from the request parameters
            const cardId = req.params.card_id;            
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }
            
            const sensitiveDetail = await cardService.getCardSensitiveDetails(token, cardId);
            res.status(200).json({data: sensitiveDetail});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

    getCardPin: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            // Extracting cardId from the request parameters
            const cardId = req.params.card_id;
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }

            const cardPin = await cardService.getCardPin(token, cardId);
            res.status(200).json({data: cardPin});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

    getCardDetail: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            // Extracting cardId from the request parameters
            const cardId = req.params.card_id;
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }

            const cardInformation = await cardService.getCardDetail(token, cardId);
            res.status(200).json({data: cardInformation});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

    getCardBalance: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            // Extracting cardId from the request parameters
            const cardId = req.params.card_id;
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }
            
            
            const cardBalance = await cardService.getCardBalance(token, cardId);
            res.status(200).json({data: cardBalance});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

    getCardTransactions: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            // Extracting cardId from the request parameters
            const cardId = req.params.card_id;
            if(!cardId) {
                return res.status(400).json({ result: "failed", message: "Card Id is required." });
            }
            
            // Extracting optional query parameters from the request
            const status = req.query.status || null;
            const page = req.query.page || null;
            const size = req.query.size || null;
            
            const cardTransactions = await cardService.getCardTransactions(token, cardId, status, page, size);
            res.status(200).json({data: cardTransactions});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },   

};

export default cardController;
