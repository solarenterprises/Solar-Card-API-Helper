// controllers/wallet/addressController.mjs
import addressService from "../../services/wallet/addressService.mjs";

const addressController = {
    getAddressDetailList: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const accountId = req.query.accountId || null;
            const addressIndex = req.query.addressIndex || null;
            const blockchain = req.query.blockchain || null;
            const currency = req.query.currency || null;

            if(!(accountId && blockchain && currency)) {
                return res.status(400).json({result: "failed", message: "AccountId, blockchain, currency are required"});
            }

            const addressDetailList = await addressService.getAddressDetailList(token, accountId, addressIndex, blockchain, currency);
            res.status(200).json({data: addressDetailList});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

};

export default addressController;
