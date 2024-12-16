// controllers/wallet/balanceController.mjs
import balanceService from "../../services/wallet/balanceService.mjs";

const balanceController = {
    getAccountBalances: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const accountId = req.query.accountId || null;
            const currency = req.query.currency || null;
            const byDate = req.query.byDate || null;

            const addressDetailList = await balanceService.getAccountBalances(token, accountId, currency, byDate);
            res.status(200).json({data: addressDetailList});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
    
    touchBalanceForCurrency: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const accountId = req.query.accountId || null;
            const currency = req.query.currency || null;

            if(!(accountId && currency)) {
                return res.status(400).json({result: "failed", message: "AccountId and currency are required"});
            }

            const touchBalance = await balanceService.touchBalanceForCurrency(token, accountId, currency);
            res.status(200).json({data: touchBalance});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },




};

export default balanceController;
