import express from "express";
import bankController from "../controllers/bank/bankController.mjs";
const router = express.Router();

router.get("/", bankController.getUserBankAccount);
router.post("/create", bankController.createUserBankAccount);

export default router;
