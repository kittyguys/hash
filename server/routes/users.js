import { Router } from "express";
import { getUsers, updateUser } from "../services/users";

const router = Router();

router.get("/users", getUsers);
router.put("/users", updateUser);

export default router;
