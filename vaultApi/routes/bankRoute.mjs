import express from "express";
import bankController from "../controllers/bank/bankController.mjs";
const router = express.Router();

router.get("/", bankController.getUserBankAccount);
router.post("/create", bankController.createUserBankAccount);
router.get("/uuid/:uuid", bankController.getBankAccountByUuid);

export default router;
