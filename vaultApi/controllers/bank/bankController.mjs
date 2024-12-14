// controllers/bank/bankController.mjs
import bankService from "../../services/bank/bankService.mjs";

const bankController = {
    getUserBankAccount: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
                
            const accountId = req.query.accountId || null;
            const status = req.query.status || null;
            
            const bankAccount = await bankService.getUserBankAccount(token, accountId, status);
            res.status(200).json({data: bankAccount}); 
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },

    createUserBankAccount: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
                
            const accountId = req.query.accountId || null;
            const currency = req.query.currency || null;
            
            const bankAccount = await bankService.createUserBankAccount(token, accountId, currency);
            res.status(200).json({data: bankAccount}); 
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },

    getBankAccountByUuid: async (req, res) => {
        try {
            const token = req.cookies.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
                
            const uuid = req.params.uuid;

            const bankAccount = await bankService.getUserBankAccountByUuid(token, uuid);
            res.status(200).json({data: bankAccount}); 
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }
    },


}

export default bankController