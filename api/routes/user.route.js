import express from "express";
import { verify } from "./../middleware/verifyToken.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", verify, getUser);
router.put("/:id", verify, updateUser);
router.delete("/:id", deleteUser);

export default router;
