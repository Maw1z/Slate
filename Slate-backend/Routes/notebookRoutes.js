const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const {
  createNotebook,
  getAllNotebook,
  getNotebook,
  updateNotebook,
  deleteNotebook,
} = require("../Controllers/notebookControllers");

// POST - Create notebook
router.post("/", verifyToken, createNotebook);

// GET - Get all notebooks
router.get("/", verifyToken, getAllNotebook);

// GET - Get notebook from id
router.get("/:notebookID", getNotebook);

// PUT - Update notebook
router.put("/:notebookID", updateNotebook);

// DELETE - Delete notebook
router.delete("/:notebookID", deleteNotebook);

module.exports = router;
