import express from "express";
import tokenController from "../controllers/currency/tokenController.mjs"
import accountController from "../controllers/currency/accountController.mjs"
import blockchainListController from "../controllers/currency/blockchainListController.mjs"
import rateController from "../controllers/currency/rateController.mjs"
import currencyController from "../controllers/currency/currencyController.mjs";
const router = express.Router();


router.get("/token", tokenController.getAllTokens);
router.get("/token/short", tokenController.getAllTokensShort);
// not found 
router.get("/preferred", accountController.getPreferredCurrencies);
router.post("/preferred", accountController.setPreferredCurrencies);
///////////////////////////
router.get("/blockchain", blockchainListController.getBlockchainList);
router.get("/rate", rateController.getRate);
router.get("/instruments", rateController.getAllInstruments);
router.get("/instruments/:instrument_id", rateController.getInstrumentDetail);
router.get("/currency", currencyController.getAllCurrencies);
router.get("/currency/slug/:currency_slug", currencyController.getCurrencyBySlug);
router.get("/currency/short", currencyController.getShortCurrencyList);
router.get("/currency/name/:currency_name", currencyController.getCurrencyByName)

export default router;
