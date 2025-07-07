import express from "express";
import { updateCalories, readCalories } from "../controllers/caloriesController.js";

const router = express.Router();

router.post("/update", updateCalories);
router.post("/read", readCalories);

export default router;
