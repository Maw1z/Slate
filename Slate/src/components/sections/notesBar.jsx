import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Skeleton } from "@/components/ui/skeleton";
import addIcon from "../../assets/icons/add.svg";

function NotesBar({
  visibility,
  selectedNotebookId,
  selectedNoteId,
  onSelectNote,
  handleUpdate,
}) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateUUID = () => {
    const newUUID = uuidv4();
    return newUUID;
  };

  useEffect(() => {
    if (!selectedNotebookId) return;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/notes/notebooks/${selectedNotebookId}/`,
        );
        setNotes(res.data.note);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching notes:", error.message);
      }
    };
    fetchNotes();
  }, [selectedNotebookId]);

  const handleAddNote = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/notes/notebooks/${selectedNotebookId}`,
        {
          NoteID: generateUUID(),
        },
      );
      console.log("Note created:", res.data);
      handleUpdate({ message: "Note created!" });
    } catch (error) {
      console.error("Error creating note:", error.message);
      handleUpdate({
        message: "Error creating note",
        error: error.message,
      });
    }
  };

  return (
    <>
      {visibility && (
        <div className="bg-background font-Grotesk scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-black scrollbar-thin scrollbar-track-background h-full w-44 overflow-y-auto border-r border-[#a3abbd]">
          <div
            className="hover:bg-main flex h-14 w-full items-center justify-center gap-1 border-b border-[#a3abbd] bg-white font-semibold hover:cursor-pointer"
            onClick={handleAddNote}
          >
            <img src={addIcon} alt="Plus" className="w-6" />
            Add Note
          </div>
          {notes.map((note) => {
            const isSelected = selectedNoteId === note.noteid;

            return (
              <button
                key={note.noteid}
                className={`hover:bg-main flex h-14 w-full items-center rounded-none border-b border-[#a3abbd] px-5 hover:cursor-pointer ${isSelected ? "bg-main rounded-xs border-2 border-b-2 border-black border-b-black text-lg font-bold" : "bg-white"} `}
                onClick={() => onSelectNote(note.noteid)}
              >
                {loading ? <Skeleton className="h-4 w-36" /> : note.notename}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default NotesBar;
