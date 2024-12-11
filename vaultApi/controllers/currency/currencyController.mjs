// controllers/currency/currencyController.mjs
import currencyService from "../../services/currency/currencyService.mjs";

const currencyController = {
    getAllCurrencies: async (req, res) => {
        try {
            const currencies = await currencyService.getAllCurrencies();
            res.status(200).json({data: currencies});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
    
};

export default currencyController;
