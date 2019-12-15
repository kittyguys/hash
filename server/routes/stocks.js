import { Router } from "express";
import { getStock, createStock } from "../services/stocks";

const router = Router();

router.get("/stocks", getStock);
router.post("/stocks", createStock);

export default router;
