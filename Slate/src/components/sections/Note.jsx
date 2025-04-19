import { useState, useEffect, useRef } from "react";
import axios from "axios";
import UtilBar from "./utilBar";
import Editor from "./Editor";
import { useHotkeys } from "react-hotkeys-hook";

function Note({ handleUpdate, selectedNotebookId, selectedNoteId }) {
  const [noteName, setNoteName] = useState("");
  const [markdownText, setMarkdownText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState("default");
  const editorRef = useRef(null);

  const handleNoteNameChange = (e) => {
    setNoteName(e.target.value);
  };

  const handleSummaryLengthChange = (value) => {
    setSummaryLength(value);
    console.log(value);
  };

  useHotkeys("ctrl+alt+s", (event) => {
    event.preventDefault();
    handleSave();
    console.log("Saved!");
  });

  useEffect(() => {
    if (!selectedNotebookId || !selectedNoteId) return;

    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/notes/notebooks/${selectedNotebookId}/${selectedNoteId}`,
        );
        const notename = res.data.note.notename;
        setNoteName(notename);
      } catch (error) {
        console.log("Error retrieving note:", error.message);
        handleUpdate({
          message: "Error retrieving note",
        });
      }
    };
    fetchContent();
  }, [selectedNoteId]);

  useEffect(() => {
    handleSummary();
  }, [summaryLength]);

  const handleSave = async () => {
    if (editorRef.current) {
      const mdx = await editorRef.current.getMarkdown();
      try {
        const res = await axios.put(
          `http://localhost:8080/api/notes/notebooks/${selectedNotebookId}/${selectedNoteId}`,
          {
            NoteName: noteName,
            NoteContent: mdx,
          },
        );
        console.log("Note saved:", res.data);
        handleUpdate({ message: "Note saved!" });
      } catch (error) {
        console.error("Error saving note:", error.message);
        handleUpdate({
          message: "Error saving note",
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/notes/notebooks/${selectedNotebookId}/${selectedNoteId}`,
      );
      console.log("Note deleted:", res.data);
      handleUpdate({ message: "Note has been deleted" });
      setMarkdownText("");
    } catch (error) {
      console.error("Error deleting note:", error.message);
      handleUpdate({
        message: "Error deleting note",
      });
    }
  };

  const handleSummary = async () => {
    if (!selectedNotebookId || !selectedNoteId) return;
    console.log("t1");

    try {
      const res = await axios.get(
        `http://localhost:8080/api/notes/notebooks/${selectedNotebookId}/${selectedNoteId}/summarise/${summaryLength}`,
      );
      console.log(res.data.summary);
      setSummary(res.data.summary);
    } catch (error) {
      console.log("Error retrieving note:", error.message);
    }
  };

  return (
    <>
      <UtilBar
        handleUpdate={handleUpdate}
        noteName={noteName}
        handleSave={handleSave}
        handleDelete={handleDelete}
        setNewName={handleNoteNameChange}
        summaryText={summary}
        handleSummary={handleSummary}
        handleSummaryLengthChange={handleSummaryLengthChange}
      />
      <Editor
        handleUpdate={handleUpdate}
        ref={editorRef}
        selectedNotebookId={selectedNotebookId}
        selectedNoteId={selectedNoteId}
        markdownText={markdownText}
        handleSave={handleSave}
      />
    </>
  );
}

export default Note;
