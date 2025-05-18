import express from "express";
import { getPeriodData, getAlerterPeriodData, getAlerterInfoData } from "../controllers/dataController.js";

const router = express.Router();

router.post("/period_data", getPeriodData);
router.post("/alerter_period_data", getAlerterPeriodData);
router.get("/alerter_ids", getAlerterInfoData);

export default router;
