const express = require("express");
const router = express.Router();
const {
  createNote,
  getAllNote,
  getNote,
  updateNote,
  deleteNote,
} = require("../Controllers/noteControllers");

// POST - Create note
router.post("/notebooks/:notebookID", createNote);

// GET - Get all note
router.get("/notebooks/:notebookID", getAllNote);

// GET - Get note from id
router.get("/notebooks/:notebookID/:noteID", getNote);

// PUT - Update note
router.put("/notebooks/:notebookID/:noteID", updateNote);

// DELETE - Delete note
router.delete("/notebooks/:notebookID/:noteID", deleteNote);

module.exports = router;
