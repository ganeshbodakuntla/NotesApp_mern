import express from "express";
import {
  deleteNote,
  getNote,
  postNote,
  updateNote,
  getOneNote,
} from "../Controllers/noteControllers.js";

const router = express.Router();

router.get("/", getNote);

router.post("/", postNote);

router.get("/:id", getOneNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
