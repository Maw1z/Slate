const pool = require(".././db");

// POST - Create note
const createNote = async (req, res) => {
  try {
    const { notebookID } = req.params;
    const { NoteID } = req.body;

    const newNote = await pool.query(
      "INSERT INTO Notes (NoteID, NotebookID) VALUES($1, $2) RETURNING *",
      [NoteID, notebookID]
    );
    res.status(201).json({
      message: "Note created successfully",
      note: newNote.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET - Get all note
const getAllNote = async (req, res) => {
  try {
    const { notebookID } = req.params;
    const notes = await pool.query(
      "SELECT * FROM Notes WHERE NotebookID = $1",
      [notebookID]
    );

    res.status(200).json({
      message: "All notes retrieved successfully",
      note: notes.rows,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET - Get note from id
const getNote = async (req, res) => {
  try {
    const { notebookID } = req.params;
    const { noteID } = req.params;

    const note = await pool.query(
      "SELECT * FROM Notes WHERE NotebookID = $1 AND NoteID = $2",
      [notebookID, noteID]
    );

    if (note.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({
      message: "Note retrieved successfully",
      note: note.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT - Update note
const updateNote = async (req, res) => {
  try {
    const { notebookID } = req.params;
    const { noteID } = req.params;
    const { NoteName, NoteContent } = req.body;

    const updateNote = await pool.query(
      "UPDATE Notes SET notename = $1, notecontent = $2 WHERE notebookid = $3 AND NoteID = $4 RETURNING *",
      [NoteName, NoteContent, notebookID, noteID]
    );

    if (updateNote.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE - Delete note
const deleteNote = async (req, res) => {
  try {
    const { notebookID } = req.params;
    const { noteID } = req.params;

    const deletedNote = await pool.query(
      "DELETE FROM Notes WHERE NotebookID = $1 AND NoteID = $2 RETURNING *",
      [notebookID, noteID]
    );

    if (deletedNote.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createNote,
  getAllNote,
  getNote,
  updateNote,
  deleteNote,
};
