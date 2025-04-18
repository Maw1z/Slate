import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./sections/sidebar";
import { toast } from "sonner";
import UtilBar from "./sections/utilBar";
import Editor from "./sections/Editor";
import Note from "./sections/Note";

function Notes() {
  const [loading, setLoading] = useState(true);
  const [selectedNotebookId, setSelectedNotebookId] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [updates, setUpdates] = useState({});

  useEffect(() => {
    if (!loading) {
      toast.success("All notebooks have been loaded");
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && updates.message) {
      toast(updates.message, {
        description: updates.error ? updates.error : undefined,
      });
    }
  }, [updates]);

  const handleNotebookSelect = (notebookid) => {
    setSelectedNotebookId(notebookid);
  };

  const handleNoteSelect = (noteid) => {
    setSelectedNoteId(noteid);
  };

  const handleUpdates = (updateObject) => {
    setUpdates(updateObject);
  };

  return (
    <div className="bg-background flex h-screen flex-col items-center">
      <Header />

      <div className="flex flex-1 self-start overflow-hidden">
        <div className="flex h-full w-screen flex-1">
          <Sidebar
            loadStatus={loading}
            handleLoad={setLoading}
            selectedNotebookId={selectedNotebookId}
            setSelectedNotebookId={handleNotebookSelect}
            selectedNoteId={selectedNoteId}
            setSelectedNoteId={handleNoteSelect}
            update={updates}
            handleUpdate={setUpdates}
          />
          <div className="h-full w-full bg-white">
            <Note
              handleUpdate={setUpdates}
              selectedNotebookId={selectedNotebookId}
              selectedNoteId={selectedNoteId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
