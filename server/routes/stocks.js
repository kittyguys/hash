import { Router } from "express";
import { getStocks, createStock } from "../services/stocks";

const router = Router();

router.get("/stocks", getStocks);
router.post("/stocks", createStock);

export default router;
