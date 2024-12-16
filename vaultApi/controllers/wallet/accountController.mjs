// controllers/wallet/accountController.mjs
import accountService from '../../services/wallet/accountService.mjs';

const accountController = {
    createWalletAccount: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

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
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const accountId = req.params.account_id;
            const account = await accountService.getWalletAccountById(token, accountId);
            res.status(200).json({data: account});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    updateWalletAccountById: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const accountId = req.params.account_id;
            const { account, accountType, shortName, currency, blockchain } = req.body;

            if(!(account && accountType && shortName)) {
                return res.status(400).json({result: "failed", message: "Account, accountType, shortName are required"});
            }

            const accountData = await accountService.updateWalletAccountById(token, accountId, account, accountType, shortName, currency, blockchain);
            res.status(200).json({data: accountData});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    getAllWalletAccounts: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const accounts = await accountService.getAllWalletAccounts(token);
            res.status(200).json({data: accounts});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

};

export default accountController;
