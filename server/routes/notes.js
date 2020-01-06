import { Router } from "express";
import { addStock, createNote, getNote } from "../services/notes";

const router = Router();

router.get("/notes/:note_id", getNote);
router.post("/notes", createNote);
router.post("/notes/:note_id/stocks", addStock);

export default router;
