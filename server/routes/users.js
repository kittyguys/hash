import { Router } from "express";
import { getUsers } from "../services/users";

const router = Router();

router.get("/users", getUsers);

export default router;
