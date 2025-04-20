const pool = require(".././db");

// POST - Create notebook
const createNotebook = async (req, res) => {
  const uid = req.uid;

  try {
    const { NotebookID, notebookName } = req.body;

    const newNotebook = await pool.query(
      "INSERT INTO Notebooks (NotebookID, UserID, notebookName) VALUES($1, $2, $3) RETURNING *",
      [NotebookID, uid, notebookName]
    );
    res.status(201).json({
      message: "Notebook created successfully",
      notebook: newNotebook.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET - Get all notebooks
const getAllNotebook = async (req, res) => {
  const uid = req.uid;

  try {
    const notebooks = await pool.query(
      "SELECT * FROM Notebooks WHERE userid = $1",
      [uid]
    );

    if (notebooks.rows.length === 0) {
      return res.status(404).json({ message: "No notebooks found" });
    }

    res.status(200).json({
      message: "All notebooks retrieved successfully",
      notebook: notebooks.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET - Get notebook from id
const getNotebook = async (req, res) => {
  try {
    const { notebookID } = req.params;

    const notebook = await pool.query(
      "SELECT * FROM Notebooks WHERE notebookid = $1",
      [notebookID]
    );

    if (notebook.rows.length === 0) {
      return res.status(404).json({ message: "Notebook not found" });
    }
    res.status(200).json({
      message: "Notebook retrieved successfully",
      notebook: notebook.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT - Update notebook
const updateNotebook = async (req, res) => {
  try {
    const { notebookID } = req.params;
    const { notebookname } = req.body;

    const updateNotebook = await pool.query(
      "UPDATE Notebooks SET notebookname = $1 WHERE notebookid = $2 RETURNING *",
      [notebookname, notebookID]
    );

    if (updateNotebook.rows.length === 0) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE - Delete notebook
const deleteNotebook = async (req, res) => {
  try {
    const { notebookID } = req.params;

    const deletedNotebook = await pool.query(
      "DELETE FROM Notebooks WHERE notebookid = $1 RETURNING *",
      [notebookID]
    );

    if (deletedNotebook.rows.length === 0) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createNotebook,
  getAllNotebook,
  getNotebook,
  updateNotebook,
  deleteNotebook,
};
