import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Header from "./sections/HeaderLoggedIn";
import Sidebar from "./sections/sidebar";
import Note from "./sections/Note";

function Notes() {
  const [loading, setLoading] = useState(true);
  const [selectedNotebookId, setSelectedNotebookId] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [updates, setUpdates] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

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
      <Header user={user} />

      <div className="flex flex-1 self-start overflow-hidden">
        <div className="flex h-full w-screen flex-1">
          <Sidebar
            user={user}
            loadStatus={loading}
            handleLoad={setLoading}
            selectedNotebookId={selectedNotebookId}
            setSelectedNotebookId={handleNotebookSelect}
            selectedNoteId={selectedNoteId}
            setSelectedNoteId={handleNoteSelect}
            update={updates}
            handleUpdate={setUpdates}
          />
          <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-black scrollbar-track-background scrollbar h-full w-full overflow-y-scroll bg-white">
            <Note
              user={user}
              setUser={setUser}
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
