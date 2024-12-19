import express from "express";
import accountController from "../controllers/wallet/accountController.mjs";
import addressController from "../controllers/wallet/addressController.mjs";
import balanceController from "../controllers/wallet/balanceController.mjs";
import counterPartyController from "../controllers/wallet/counterPartyController.mjs";
import transactionController from "../controllers/wallet/transactionController.mjs";
const router = express.Router();

router.post("/account", accountController.createWalletAccount);
router.get("/account/:account_id", accountController.getWalletAccountById);
router.put("/account/:account_id", accountController.updateWalletAccountById);
router.get("/account", accountController.getAllWalletAccounts);
// TIMEOUT ERROR 408
router.get("/v2/address/list", addressController.getAddressDetailList);
router.get("/v2/address/format/validation", addressController.checkCryptoCurrencyAddressValidation);
//
router.get("/balance", balanceController.getAccountBalances);
router.post("/balance", balanceController.touchBalanceForCurrency);
router.get("/balance/log", balanceController.getPagedBalance);
router.get("/balance/log/:log_id", balanceController.getBalanceLogById);

//
router.get("/counterparty/:counterParty_id", counterPartyController.getCounterPartyById);
router.post("/counterparty", counterPartyController.createNewCounterParty);
router.put("/counterparty/:counterParty_id", counterPartyController.updateCounterPartyById);
router.delete("/counterparty/:counterParty_id", counterPartyController.deleteCounterPartyById);
router.get("/counterparty", counterPartyController.getCounterParties);

//
router.post("/payin", transactionController.createCurrencyPayIn)

export default router;
