import express from "express";
import {
  registerUser,
  authUser,
  addSymptoms,
  getCards
} from "../controllers/userControllers.js";

const router = express.Router();
router.route("/signup").post(registerUser)
router.post("/login", authUser);
router.post("/addsymptoms", addSymptoms);
router.post("/cards", getCards);
export default router;
