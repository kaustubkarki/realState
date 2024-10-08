import express from "express";
import { verify } from "./../middleware/verifyToken.js";
import {
  deleteUser,
  getUser,
  getUsers,
  savePost,
  updateUser,
  profilePosts,
  getNotificationNumber,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/search/:id", verify, getUser);
router.put("/:id", verify, updateUser);
router.delete("/:id", deleteUser);
router.post("/save", verify, savePost);
router.get("/profilePosts", verify, profilePosts);
router.get("/notification", verify, getNotificationNumber);

export default router;
