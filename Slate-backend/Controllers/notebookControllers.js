const pool = require(".././db");

// POST - Create notebook
const createNotebook = async (req, res) => {
  const client = await pool.connect();

  try {
    const { NotebookID, UserID, notebookName } = req.body;

    const newNotebook = await pool.query(
      "INSERT INTO Notebooks (NotebookID, UserID, notebookName) VALUES($1, $2, $3) RETURNING *",
      [NotebookID, UserID, notebookName]
    );
    res.json(newNotebook.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

// GET - Get all notebooks
const getAllNotebook = async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM Notebooks");

    res.json(result.rows);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
  res.status(404);
};

// GET - Get notebook from id
const getNotebook = async (req, res) => {
  try {
    const { notebookID } = req.params;

    const notebook = await pool.query(
      "SELECT * FROM Notebooks WHERE notebookid = $1",
      [notebookID]
    );
    res.json(notebook.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

// PUT - Update notebook
const updateNotebook = async (req, res) => {
  try {
    const { notebookID } = req.params;
    const { notebookname } = req.body;

    const updateNotebook = await pool.query(
      "UPDATE Notebooks SET notebookname = $1 WHERE notebookid = $2",
      [notebookname, notebookID]
    );

    res.json("Notebook was updated");
  } catch (error) {
    console.log(error.message);
  }
};

// DELETE - Delete notebook
const deleteNotebook = async (req, res) => {
  try {
    const { notebookID } = req.params;

    const deletedNotebook = await pool.query(
      "DELETE FROM Notebooks WHERE notebookid = $1",
      [notebookID]
    );

    res.json("Notebook was deleted");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createNotebook,
  getAllNotebook,
  getNotebook,
  updateNotebook,
  deleteNotebook,
};
