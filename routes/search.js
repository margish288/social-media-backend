import express from "express";
import { searchUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, searchUser);

export default router;
