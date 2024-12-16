import express from "express";
import accountController from "../controllers/wallet/accountController.mjs";
const router = express.Router();

router.post("/account/new", accountController.createWalletAccount);
router.get("/account/:account_id", accountController.getWalletAccountById);

export default router;
