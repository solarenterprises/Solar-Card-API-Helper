// controllers/card/cardController.mjs
import cardService from "../../services/card/cardService.mjs";

const cardController = {
    getCardOfferList: async (req, res) => {
        try {
            const token = req.cookie.token;
            const cardOffers = await cardService.getCardOfferList(token);
            res.status(200).json({data: cardOffers});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    getCardRequestList: async (req, res) => {
        try {
            const token = req.cookie.token;
            const cardRequests = await cardService.getCardRequestList(token);
            res.status(200).json({data: cardRequests});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

};

export default cardController;
