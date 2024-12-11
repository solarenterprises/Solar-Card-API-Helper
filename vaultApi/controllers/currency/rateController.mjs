// controllers/currency/rateController.mjs
import rateService from "../../services/currency/rateService.mjs";

const rateController = {
    getBlockchainList: async (req, res) => {
        const fromCurrency = req.params.fromCurrency;
        const toCurrency = req.params.toCurrency;
        const amount = req.params.amount;
        try {
            const rate = await rateService.getRate();
            res.status(200).json({data: rate});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    }
};

export default rateController;
