import { Router } from "express";
import { getStocks, createStock, reorderStock } from "../services/stocks";

const router = Router();

router.get("/stocks", getStocks);
router.post("/stocks", createStock);
router.patch("/stocks/reorder", reorderStock);

export default router;
