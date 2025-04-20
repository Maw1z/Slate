import { useState, useEffect } from "react";
import axios from "axios";
import { getIdToken } from "firebase/auth";
import NotebooksBar from "./notebooksBar";
import NotesBar from "./notesBar";
import booksOpenIcon from "../../assets/icons/books-open.svg";
import booksClosedIcon from "../../assets/icons/books-closed.svg";

function Sidebar({
  user,
  loadStatus,
  handleLoad,
  selectedNotebookId,
  setSelectedNotebookId,
  selectedNoteId,
  setSelectedNoteId,
  update,
  handleUpdate,
}) {
  const [sidebarOpened, setSideBarOpened] = useState(true);
  const [notebooks, setNotebooks] = useState([]);

  const handleSidebarOpened = () => {
    setSideBarOpened(!sidebarOpened);
  };

  const getUserToken = async () => {
    if (!user) return;

    try {
      const idToken = await getIdToken(user);
      return idToken;
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        const token = await getUserToken();

        const res = await axios.get("http://localhost:8080/api/notebooks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotebooks(res.data.notebook);
        handleLoad(false);

        if (res.data.notebook.length > 0) {
          setSelectedNotebookId(res.data.notebook[0].notebookid);
        }
      } catch (error) {
        console.log("Error fetching notebooks:", error.message);
      }
    };
    if (user) fetchNotebooks();
  }, [update, user]);

  return (
    <section className="flex flex-1">
      <div className="bg-background flex h-full w-13 flex-col border-r border-[#a3abbd]">
        <div
          className="hover:bg-main flex h-14 w-full items-center justify-center border-b-1 border-[#a3abbd] bg-white"
          onClick={handleSidebarOpened}
        >
          <img
            src={sidebarOpened ? booksOpenIcon : booksClosedIcon}
            alt="Books icon"
            className="h-6 w-6"
          />
        </div>
      </div>
      <NotebooksBar
        user={user}
        visibility={sidebarOpened}
        loading={loadStatus}
        notebooks={notebooks}
        selectedNotebookId={selectedNotebookId}
        onSelectNotebook={setSelectedNotebookId}
        handleUpdate={handleUpdate}
        getUserToken={getUserToken}
      />
      <NotesBar
        visibility={sidebarOpened}
        update={update}
        selectedNotebookId={selectedNotebookId}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        handleUpdate={handleUpdate}
      />
    </section>
  );
}

export default Sidebar;
