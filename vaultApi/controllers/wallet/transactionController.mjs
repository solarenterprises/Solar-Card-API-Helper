import transactionService from "../../services/wallet/transactionService.mjs";


const transactionController = {
    createCurrencyPayIn: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const dryRun = req.params.dryRun || null;
            const { account, fromCurrency, toCurrency, fromAmount, signedRate } = req.body;


            const currencyPayIn = await transactionService.createCurrencyPayIn(token, dryRun, {account, fromCurrency, toCurrency, fromAmount, signedRate});
            res.status(200).json({data: currencyPayIn});
        } catch (error) {
            console.log(error);
            res.status(500).json({result: "failed"});
        }
    },

    getAllPlan: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
            
            const accountId = req.params.accountId || null;
            const currencyPayIn = await transactionService.getAllPlan(token, accountId);
            res.status(200).json({data: currencyPayIn});
        } catch (error) {
            console.log(error);
            res.status(500).json({result: "failed"});
        }
    },
}


export default transactionController;