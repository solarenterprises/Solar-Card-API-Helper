import express from "express";
import accountController from "../controllers/wallet/accountController.mjs";
import addressController from "../controllers/wallet/addressController.mjs";
const router = express.Router();

router.post("/account/new", accountController.createWalletAccount);
router.get("/account/:account_id", accountController.getWalletAccountById);
router.put("/account/update/:account_id", accountController.updateWalletAccountById);
router.get("/account/all", accountController.getAllWalletAccounts);
router.get("/address/address-list", addressController.getAddressDetailList);
// TIMEOUT ERROR 408
router.get("/address/validation", addressController.checkCryptoCurrencyAddressValidation);

export default router;
