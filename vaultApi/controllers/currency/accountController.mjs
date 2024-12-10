// controllers/currency/accountController.mjs
import accountService from '../../services/currency/accountService.mjs';

const accountController = {
    getPreferredCurrencies: async (req, res) => {
        try {
            const token = req.cookie.token;
            const {accountId} = req.body;
            const tokenResponse = await accountService.getPreferredCurrencies(accountId, token);
            res.status(200).json({data: tokenResponse});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    setPreferredCurrencies: async (req, res) => {
        try {
            const token = req.cookie.token;
            const {currencies, accountId} = req.body;
            const tokenResponse = await accountService.getPreferredCurrencies(accountId, currencies, token);
            res.status(200).json({data: tokenResponse});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
};

export default accountController;
