import express from "express";
import { signIn, signUp, userUpdate } from "../controllers/webhook.controller.js";

const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
router.patch('/updateUser',userUpdate);

export default router;