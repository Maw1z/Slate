const axios = require("axios");
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

// GET - Summarise note
const summariseNote = async (req, res) => {
  const { notebookID, noteID, summaryLength } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM Notes WHERE NotebookID = $1 AND NoteID = $2",
      [notebookID, noteID]
    );
    const noteContent = result.rows[0].notecontent;

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (!noteContent) {
      return res.status(404).json({ error: "Note not found" });
    }

    let maxTokens;
    if (summaryLength === "short") {
      maxTokens = 150; // 100 words
    } else if (summaryLength === "medium") {
      maxTokens = 450; // 300 words
    } else if (summaryLength === "detailed") {
      maxTokens = 750; // 500 words
    } else if (summaryLength === "default ") {
      maxTokens = 300; // default summary length
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that summarizes notes. You either write in markdown text or plain text",
          },
          { role: "user", content: `Summarize this:\n\n${noteContent}` },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    const summary = response.data.choices[0].message.content;

    res.json({ summary });
  } catch (error) {
    console.error("Error summarizing note:", error);
    res.status(500).json({ error: "Failed to summarize note" });
  }
};

module.exports = {
  createNote,
  getAllNote,
  getNote,
  updateNote,
  deleteNote,
  summariseNote,
};
