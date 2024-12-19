import express from "express";
import bankController from "../controllers/bank/bankController.mjs";
const router = express.Router();

// not working at all
// 403 ERROR
router.get("/bank-account", bankController.getUserBankAccount);
router.post("/bank-account", bankController.createUserBankAccount);
router.get("/bank-account/:uuid", bankController.getBankAccountByUuid);
router.delete("/bank-account/:uuid", bankController.deleteBankAccountByUuid);

export default router;
