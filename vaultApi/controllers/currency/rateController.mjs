// controllers/currency/rateController.mjs
import rateService from "../../services/currency/rateService.mjs";

const rateController = {
    getRate: async (req, res) => {
        const { fromCurrency, toCurrency, amount } = req.query;

        try {
            const rate = await rateService.getRate(fromCurrency, toCurrency, amount);
            res.status(200).json({data: rate});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
    
    getAllInstruments: async (req, res) => {
        try {
            const rate = await rateService.getAllInstruments();
            res.status(200).json({data: rate});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
    
    getInstrumentDetail: async (req, res) => {
        const instrumentId = req.params.instrument_id;

        try {
            const rate = await rateService.getInstrumentDetail(instrumentId);
            res.status(200).json({data: rate});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
};

export default rateController;
