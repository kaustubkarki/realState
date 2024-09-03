import express from "express";
import {
  getChats,
  getChat,
  addChat,
  readChat,
} from "../controllers/chat.controller.js";
import { verify } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verify, getChats);
router.get("/:id", verify, getChat);
router.post("/", verify, addChat);
router.put("/read/:id", verify, readChat);

export default router;
