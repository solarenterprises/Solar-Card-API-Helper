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

            const account = await accountService.createWalletAccount(token, shortName, accountType, currency, blockchain);
            res.status(200).json({data: account});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    getWalletAccountById: async (req, res) => {
        try {
            const token = req.cookies.token;
            const accountId = req.params.account_id;
            const account = await accountService.getWalletAccountById(token, accountId);
            res.status(200).json({data: account});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

};

export default accountController;
