import express from "express";
import { signIn, signUp, userUpdate, verifyEmail,resendOTP } from "../controllers/webhook.controller.js";

const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
router.patch('/updateUser',userUpdate);
router.post('/verifyemail',verifyEmail);
router.post('/resendOTP',resendOTP);

export default router;