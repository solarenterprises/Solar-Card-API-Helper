// controllers/bank/bankController.mjs
import bankService from "../../services/bank/bankService.mjs";

const bankController = {
    gerUserBankAccount: async (req, res) => {
        try {
            const token = req.cookie.token; // Retrieve authentication token from cookies
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }
                
            const accountId = req.params.accountId || null;
            const status = req.params.status || null;
            
            const bankAccount = await bankService.gerUserBankAccount(token, accountId, status);
            res.status(200).json({data: bankAccount}); 
        } catch (error) {
            console.log(error); // Log any errors encountered
            res.status(500).json({result: "failed"}); // Return 500 status on error
        }

    }
}

export default bankController