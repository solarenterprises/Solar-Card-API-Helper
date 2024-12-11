import express from "express";
import tokenController from "../controllers/currency/tokenController.mjs"
import accountController from "../controllers/currency/accountController.mjs"
import blockchainListController from "../controllers/currency/blockchainListController.mjs"
import rateController from "../controllers/currency/rateController.mjs"
import currencyController from "../controllers/currency/currencyController.mjs";
const router = express.Router();


router.get("/all-tokens", tokenController.getAllTokens);
router.get("/short-all-tokens", tokenController.getAllTokensShort);
router.get("/preferred-currencies", accountController.getPreferredCurrencies);
router.post("/preferred-currencies", accountController.setPreferredCurrencies);
router.get("/blockchain-list", blockchainListController.getBlockchainList);
router.get("/rate", rateController.getRate);
// not working server error
router.get("/instruments/all", rateController.getAllInstruments);
router.get("/instrument/:instrument_id", rateController.getInstrumentDetail);
router.get("/all-currencies", currencyController.getAllCurrencies);
router.get("/currency/:currency_slug", currencyController.getCurrencyBySlug);


export default router;
