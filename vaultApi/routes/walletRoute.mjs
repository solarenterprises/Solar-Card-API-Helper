import express from "express";
import accountController from "../controllers/wallet/accountController.mjs";
import addressController from "../controllers/wallet/addressController.mjs";
import balanceController from "../controllers/wallet/balanceController.mjs";
const router = express.Router();

router.post("/account/new", accountController.createWalletAccount);
router.get("/account/:account_id", accountController.getWalletAccountById);
router.put("/account/update/:account_id", accountController.updateWalletAccountById);
router.get("/account/all", accountController.getAllWalletAccounts);
// TIMEOUT ERROR 408
router.get("/address/address-list", addressController.getAddressDetailList);
router.get("/address/validation", addressController.checkCryptoCurrencyAddressValidation);
//
router.get("/balance", balanceController.getAccountBalances);
router.post("/balance-touch", balanceController.touchBalanceForCurrency);
router.get("/paged-balance", balanceController.getPagedBalance)

export default router;
