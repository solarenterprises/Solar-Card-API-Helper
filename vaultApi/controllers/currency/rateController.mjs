// controllers/currency/rateController.mjs
import rateService from "../../services/currency/rateService.mjs";

const rateController = {
    getBlockchainList: async (req, res) => {
        const { fromCurrency, toCurrency, amount } = req.query;

        try {
            const rate = await rateService.getRate(fromCurrency, toCurrency, amount);
            res.status(200).json({data: rate});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    }
};

export default rateController;
