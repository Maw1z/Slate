const express = require("express");
const app = express();
const cors = require("cors");
// const pool = require("./db");
const notebookRoutes = require("./Routes/notebookRoutes");
const noteRoutes = require("./Routes/noteRoutes");

// middleware
app.use(cors());
app.use(express.json());

// routes for notebook
app.use("/api/notebooks", notebookRoutes);
app.use("/api/", noteRoutes);

app.listen(6000, () => {
  console.log("server has started on port 6000");
});
