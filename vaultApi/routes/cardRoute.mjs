import express from "express";
import cardController from "../controllers/card/cardController.mjs";
const router = express.Router();


router.get('/cardoffer', cardController.getCardOfferList);
router.get('/cardrequest', cardController.getCardRequestList);
// need CardOfferId but not sure how to obtain
router.post("/cardrequest", cardController.createCardRequest);
router.get("/transaction", cardController.getTransactions);
router.get("/cardholder/card", cardController.getCardOffersList);
router.post("/cardholder/card/:card_id/pin/reset", cardController.resetCardPIN);
router.get("cardholder/card/:card_id/limits", cardController.getCardLimits);
router.post("/cardholder/card/:card_id/limits", cardController.updateCardLimits);
router.post("/cardholder/card/:card_id/change-type", cardController.updateCardType);
router.post("/cardholder/card/:card_id/change-status", cardController.updateCardStatus);
router.post("/cardholder/card/:card_id/activate", cardController.activateCard);
router.get("/cardholder/card/:card_id", cardController.getCardInformation);
router.get("/cardholder/card/:card_id/top-up-information", cardController.getTopUpInformation);
router.get("/cardholder/card/:card_id/sensitive-details", cardController.getCardSensitiveDetails);
router.get("/cardholder/card/:card_id/pin", cardController.getCardPin);
router.get("/cardholder/card/:card_id/details", cardController.getCardDetail);
router.get("/cardholder/card/:card_id/balance", cardController.getCardBalance);
router.get("/cardholder/card/:card_id/transactions", cardController.getCardTransactions);

export default router;
