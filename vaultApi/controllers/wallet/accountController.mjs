// controllers/wallet/accountController.mjs
import accountService from '../../services/wallet/accountService.mjs';


const accountController = {
    createWalletAccount: async (req, res) => {
        try {
            const token = req.cookies.token;
            const shortName = req.query.shortName || null;
            const accountType = req.query.accountType || null;
            const currency = req.query.currency || null;
            const blockchain = req.query.blockchain || null;

            const tokenResponse = await accountService.createWalletAccount(token, shortName, accountType, currency, blockchain);
            res.status(200).json({data: tokenResponse});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

};

export default accountController;
