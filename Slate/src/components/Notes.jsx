import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./sections/sidebar";
import { toast } from "sonner";
import UtilBar from "./sections/utilBar";

function Notes() {
  const [loading, setLoading] = useState(true);
  const [selectedNotebookId, setSelectedNotebookId] = useState(null);
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

  const handleUpdates = (updateObject) => {
    setUpdates(updateObject);
  };

  return (
    <div className="bg-background flex h-screen flex-col items-center">
      <Header />
      {selectedNotebookId && (
        <UtilBar handleUpdate={setUpdates} notebookID={selectedNotebookId} />
      )}
      <div className="flex flex-1 self-start overflow-hidden">
        <Sidebar
          loadStatus={loading}
          handleLoad={setLoading}
          selectedNotebook={selectedNotebookId}
          setSelectedNotebookId={handleNotebookSelect}
        />
      </div>
    </div>
  );
}

export default Notes;
