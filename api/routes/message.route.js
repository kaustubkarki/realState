import express from "express";
import { addMessage } from "../controllers/message.controller.js";
import { verify } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/:chatId", verify, addMessage);

export default router;
