import mongoose from "mongoose";
import Note from "../model/Note.js";

export async function getNote(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("error in getNote", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
export async function getOneNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Id not found" });
    res.status(200).json(note);
  } catch (error) {
    console.log("error in getOneNote", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function postNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const renote = await newNote.save();
    res.status(201).json(renote);
  } catch (error) {
    console.log("error in postNote", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Id not matched with the format" });
    }
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );
    if (!updatedNote) return res.status(404).json({ message: "Id not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("error in updateNote", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const deleteNote1 = await Note.findByIdAndDelete(id);
    if (!deleteNote1) return res.status(404).json({ message: "Id not found" });
    res.status(200).send(`the record deleted successfully with the id:${id}`);
  } catch (error) {
    console.log("error in deleteNote", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
