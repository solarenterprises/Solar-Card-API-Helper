// controllers/card/cardController.mjs
import cardService from "../../services/card/cardService.mjs";

const token = "eyJraWQiOiJmODAyNjg0OC1mNTJkLTRmYWYtOGQ2OS1hNTM0YTA3NmQwOTAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJodHRwczovL2V4Y2hhbmdlLnBpL2F1dGhvcml6YXRpb24vcm9sZXMiOlsiZXhwaTpwdG46OjEzOnJvbGUvY2xpZW50Il0sInN1YiI6IjJkMmUzZWRhLTg5OGQtNGZhOS1hNGNkLWVmMzJjMmFlZGRjYyIsImF1ZCI6Imh0dHBzOi8va3J5cHRvbml0Iiwic2NvcGUiOiJkZXBvc2l0X2NyeXB0bzpjcmVhdGUgdXNlcl9lbWFpbDpjcmVhdGUgdHJhbnNmZXI6cmVhZCBkZXBvc2l0X2Jhbms6Y3JlYXRlIGV4Y2hhbmdlOmNyZWF0ZSB3aXRoZHJhdzpyZWFkIHRyYW5zZmVyX293bjpjcmVhdGUgd2l0aGRyYXdfYmFuazpzaG93IHVzZXJfbWZhOnJlYWQgdG9wX3VwX2FjY291bnQ6c2hvdyBkZXBvc2l0OnJlYWQgdXNlcl9waG9uZTpjcmVhdGUgd2l0aGRyYXdfaXBzOnNob3cgd2l0aGRyYXdfYXRtX2djcF9xcjpzaG93IHdpdGhkcmF3X290aGVyX2FjY291bnQ6c2hvdyBjb3VudGVycGFydHk6Y3JlYXRlIHRvcF91cF9jcnlwdG86c2hvdyB0b3BfdXBfYXRtX2djcF9xcjpzaG93IHVzZXJfbWZhOmNyZWF0ZSB3aXRoZHJhd19hdG06Y3JlYXRlIHdpdGhkcmF3X2FjY291bnQ6c2hvdyB0cmFuc2Zlcl9vdGhlcjpjcmVhdGUgdG9wX3VwX2JhbmtfY2FyZDpzaG93IHVzZXJfZW1haWw6d3JpdGUgZGVwb3NpdF9hdG06Y3JlYXRlIGFjY291bnRzOnJlYWQgYWNjb3VudHM6Y3JlYXRlIGNhcmRob2xkZXJfdXNlcjpyZWFkIGV4Y2hhbmdlOnNob3cgYWNjb3VudHM6c2hvdyBleGNoYW5nZTpyZWFkIHdpdGhkcmF3X2NyeXB0bzpjcmVhdGUgd2l0aGRyYXdfYmFuazpjcmVhdGUgdXNlcl9waG9uZTp3cml0ZSB3aXRoZHJhd19jcnlwdG86c2hvdyBjYXJkaG9sZGVyX3VzZXI6d3JpdGUgY291bnRlcnBhcnR5OnJlYWQgdG9wX3VwX2Jhbms6c2hvdyIsImlzcyI6Imh0dHBzOi8va3J5cHRvbml0LWFwaS5zdGcuZGFya25ldC5waWVmaS5hcHAvcmVnIiwiZXhwIjoxNzMzOTk1MzE2LCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzMzOTA4OTE2LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJqdGkiOiI3ZmU5NzlkNi03Y2I2LTQyODItYmI4ZS1lMDBmOWRlMjZkNzYifQ.fshRHIR5q8FD5FWBxyNfIlE4kZ8oSABimgmBdBFOvS1ZNMp0HdCOErUDuOT6KELAOda3sjvbhyQiZ7ONRBPAyfIIWGxWQHIQYX4GSAgfMq7GJCnjh4vurg4qa0_BplEA1yY5ulkCsXu0cHLwJ5QCkhoZCziCU8w5uCN95z_oTEhAmfiSxb13YnDWyrfFIGjXjW4CDw36s0K96J0PP7rtW-8R6j4hEPuo5lnwHGXcP-gGZt_NeX2sZpnU2jjRovfuIiiXuArHe4mkWz2OaA-np7AUgNEOgimeXZGgWb2hYifJlj4kTSNUQvWtUi81Ehw-AeFcbHanA2FN5Q9Iof79p_cSgesNjSN0WXAF7yWCcb5tUaaw_N6etjlzurRUkx4QNg0shOA_4VgZvbQoReID_6fUgiMetY2i2kO4AAbptz4hfs5zmNPNREFHJFf3DyhwhaAPPCxKZ8XHuGAmlzWXMpsjE990Po33Dn5ZKtDCRbRjmkHW3uinkvxK8QAzaEyZIWgpwab24fudUSNgpcJBRh1zWJyaXpR5UCa7VV81wD_44pSr51rKy8HgQgV1XUrD7UOzTSg40tcEgGyPAJRlv5PA8zGJNUKWUgGJinbFZtDgoPn7rgArSx4ihOhYmwL1YflIXFc04D78AHoBqAEkGLWk1jDoLFT0zd0MfXA4sfI"
const cardController = {
    getCardOfferList: async (req, res) => {
        try {
            // const token = req.cookie.token;
            if (!token) {
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardOffers = await cardService.getCardOfferList(token);
            res.status(200).json({data: cardOffers});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    getCardRequestList: async (req, res) => {
        try {
            // const token = req.cookie.token;
            if (!token) {
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardRequests = await cardService.getCardRequestList(token);
            res.status(200).json({data: cardRequests});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    createCardRequest: async (req, res) => {
        try {
            // const token = req.cookie.token;
            if (!token) {
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
            } = req.body;
            
            if(!cardOfferId) {
                return res.status(404).json({ result: "failed", message: "CardOfferId is missing." });
            }

            const cardRequest = await cardService.createCardRequest(token, cardOfferId, accountId,  preferredCardname,  secondaryCardname,  
                    billingAddress,  deliveryAddress, cardDesignId);
            res.status(200).json({data: cardRequest});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    getTransactions: async (req, res) => {
        try {
            // const token = req.cookie.token;
            if (!token) {
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const { cardId, status, startDate, endDate, size, page, sort } = req.query;

            // Validate required parameters
            if (!cardId) {
                return res.status(400).json({ result: "failed", message: "Card ID is required." });
            }

            const transactions = await cardService.getTransactions(token, cardId, status, startDate, endDate, size, page, sort);
            res.status(200).json({data: transactions});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    getCardOffersList: async (req, res) => {
        try {
            // const token = req.cookie.token;
            if (!token) {
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardOffers = await cardService.getCardOffersList(token);
            res.status(200).json({data: cardOffers});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
    
    resetCardPIN: async (req, res) => {
        try {
            // const token = req.cookie.token;
            if (!token) {
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const {cardId, pin, secretQuestion, secretQuestionAnswer} = req.body;
            const resetPIN = await cardService.resetCardPIN(token, cardId, pin, secretQuestion, secretQuestionAnswer);
            res.status(200).json({data: resetPIN});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    getCardLimits: async (req, res) => {
        try {
            // const token = req.cookie.token;
            if (!token) {
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const cardId = req.params.card_id;
            const card = await cardService.getCardLimits(token, cardId);
            res.status(200).json({data: card});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    updateCardLimits: async (req, res) => {
        try {
            // const token = req.cookie.token;
            if (!token) {
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            const { cardId, transaction, daily, weekly, monthly, yearly, allTime } = req.body;
            const card = await cardService.updateCardLimits(token, cardId, transaction, daily, weekly, monthly, yearly, allTime );
            res.status(200).json({data: card});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },






    

};

export default cardController;
