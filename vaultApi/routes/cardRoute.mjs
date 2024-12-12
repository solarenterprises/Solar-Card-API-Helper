import express from "express";
import cardController from "../controllers/card/cardController.mjs";
const router = express.Router();


router.get('/card-offer', cardController.getCardOfferList);
router.get('/card-request', cardController.getCardRequestList);
router.post("/create-card", cardController.createCardRequest);
router.get("/transactions", cardController.getTransactions);
router.get("/card-offers", cardController.getCardOffersList);
router.get("/reset-cardPIN/:card_id", cardController.resetCardPIN);
router.get("/card-limits/:card_id", cardController.getCardLimits);


export default router;
