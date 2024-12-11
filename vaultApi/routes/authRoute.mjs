import express from "express";
import RegisterController from "../controllers/Registration/RegisterController.mjs";
import AuthController from "../controllers/Registration/AuthController.mjs";

const router = express.Router();


router.get('/reg/user/:id', RegisterController.getReqs);
router.patch('/reg/user/info', RegisterController.updateUser);
router.post('/reg/auth/token', AuthController.OAuthToken);



export default router;
