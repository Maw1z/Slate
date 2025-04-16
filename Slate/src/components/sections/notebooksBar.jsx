import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import addIcon from "../../assets/icons/add.svg";

function NotebooksBar({
  visibility,
  loading,
  notebooks,
  onSelectNotebook,
  handleUpdate,
}) {
  const [newNotebookName, setNewNotebookName] = useState(null);

  const generateUUID = () => {
    const newUUID = uuidv4();
    return newUUID;
  };

  const handleNewNotebookName = (e) => {
    setNewNotebookName(e.target.value);
  };

  const handleAddNotebook = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/notebooks/", {
        NotebookID: generateUUID(),
        // TODO: Add firebase uid here
        UserID: "345",
        notebookName: newNotebookName,
      });
      console.log("Notebook created:", res.data);
      handleUpdate({ message: "Notebook created!" });
    } catch (error) {
      console.error("Error creating notebook:", error.message);
      handleUpdate({
        message: "Error creating notebook",
        error: error.message,
      });
    }
  };

  return (
    <>
      {visibility && (
        <div className="bg-background font-Grotesk scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-black scrollbar-thin scrollbar-track-background h-full w-44 overflow-y-auto border-r border-[#a3abbd]">
          <Dialog>
            <DialogTrigger asChild>
              <div className="hover:bg-main flex h-14 w-full items-center justify-center gap-1 border-b border-[#a3abbd] bg-white font-semibold hover:cursor-pointer">
                <img src={addIcon} alt="Plus" className="w-6" />
                Add Notebook
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddNotebook}>
                <DialogHeader>
                  <DialogTitle>Add notebook</DialogTitle>
                  <DialogDescription>
                    Create your new notebook here. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="mb-3 grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Notebook Name</Label>
                    <Input
                      id="name-1"
                      name="name"
                      type="name"
                      defaultValue="New Notebook"
                      onChange={handleNewNotebookName}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="neutral">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {notebooks.map((book) => (
            <button
              key={book.notebookid}
              className="hover:bg-main focus:bg-main flex h-14 w-full items-center rounded-none border-b border-[#a3abbd] bg-white px-5 hover:cursor-pointer focus:border-2 focus:border-black focus:font-bold"
              onClick={() => onSelectNotebook(book.notebookid)}
            >
              {loading ? <Skeleton className="h-4 w-36" /> : book.notebookname}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default NotebooksBar;
