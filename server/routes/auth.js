import { Router } from "express";
import { signup } from "../services/auth";

const router = Router();

router.post("/auth/signup", signup);

export default router;
