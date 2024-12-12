import express from "express";
import cardController from "../controllers/card/cardController.mjs";
const router = express.Router();


router.get('/card-offer', cardController.getCardOfferList);
router.get('/card-request', cardController.getCardRequestList);
router.post("/create-card", cardController.createCardRequest);
router.get("/transactions", cardController.getTransactions);


export default router;
