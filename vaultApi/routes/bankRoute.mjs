import express from "express";
import bankController from "../controllers/bank/bankController.mjs";
const router = express.Router();

router.get("/", bankController.gerUserBankAccount)

export default router;
