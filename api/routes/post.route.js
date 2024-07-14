import express from "express";
import { verify } from "./../middleware/verifyToken.js";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verify, addPost);
router.put("/:id", verify, updatePost);
router.delete("/:id", verify, deletePost);

export default router;
