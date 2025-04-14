const express = require("express");
const router = express.Router();
const {
  createNotebook,
  getAllNotebook,
  getNotebook,
  updateNotebook,
  deleteNotebook,
} = require("../Controllers/notebookControllers");

// POST - Create notebook
router.post("/", createNotebook);

// GET - Get all notebooks
router.get("/", getAllNotebook);

// GET - Get notebook from id
router.get("/:notebookID", getNotebook);

// PUT - Update notebook
router.put("/:notebookID", updateNotebook);

// DELETE - Delete notebook
router.delete("/:notebookID", deleteNotebook);

module.exports = router;
