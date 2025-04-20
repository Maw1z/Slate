import { useState, useEffect } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import addIcon from "../../assets/icons/add.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";

function NotebooksBar({
  user,
  visibility,
  loading,
  notebooks,
  selectedNotebookId,
  onSelectNotebook,
  handleUpdate,
  getUserToken,
}) {
  const [newNotebookName, setNewNotebookName] = useState(null);
  const [toUpdateNotebook, setToUpdateNotebook] = useState({});
  const [updatedNotebookName, setUpdatedNotebookName] = useState("");

  const generateUUID = () => {
    const newUUID = uuidv4();
    return newUUID;
  };

  const handleNewNotebookName = (e) => {
    setNewNotebookName(e.target.value);
  };

  const handleNotebookNameChange = (e) => {
    setUpdatedNotebookName(e.target.value);
  };

  useEffect(() => {
    if (!selectedNotebookId) return;

    const fetchSpecificNotebook = async () => {
      try {
        const token = await getUserToken();

        const res = await axios.get(
          `http://localhost:8080/api/notebooks/${selectedNotebookId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setToUpdateNotebook(res.data.notebook);
      } catch (error) {
        console.log("Error fetching notebook", error.message);
      }
    };
    if (user) fetchSpecificNotebook();
  }, [selectedNotebookId, user]);

  const handleAddNotebook = async () => {
    try {
      const token = await getUserToken();

      const res = await axios.post(
        "http://localhost:8080/api/notebooks/",
        {
          NotebookID: generateUUID(),
          notebookName: newNotebookName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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

  const handleNotebookUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/notebooks/${selectedNotebookId}`,
        {
          notebookname: updatedNotebookName,
        },
      );
      console.log("Notebook updated:", res.data);
      handleUpdate({ message: "Notebook name updated!" });
    } catch (error) {
      console.error("Error updating notebook:", error.message);
      handleUpdate({
        message: "Error updating notebook",
        error: error.message,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/notebooks/${selectedNotebookId}`,
      );
      console.log("Notebook deleted:", res.data);
      handleUpdate({ message: "Notebook has been deleted" });
    } catch (error) {
      console.error("Error deleting notebook:", error.message);
      handleUpdate({
        message: "Error deleting notebook",
        error: error.message,
      });
    }
  };

  return (
    <>
      {visibility && (
        <div className="bg-background font-Grotesk scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-black scrollbar-thin scrollbar-track-background flex h-full w-44 flex-col items-center overflow-y-auto border-r border-[#a3abbd]">
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

          {notebooks.map((book) => {
            const isSelected = selectedNotebookId === book.notebookid;

            return (
              <button
                key={book.notebookid}
                className={`hover:bg-main flex h-14 w-full items-center rounded-none border-b border-[#a3abbd] px-5 hover:cursor-pointer ${isSelected ? "bg-main rounded-xs border-2 border-b-2 border-black border-b-black text-lg font-bold" : "bg-white"} `}
                onClick={() => onSelectNotebook(book.notebookid)}
              >
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <span className="w-full truncate overflow-hidden text-left whitespace-nowrap">
                    {book.notebookname}
                  </span>
                )}
              </button>
            );
          })}
          <div className="mt-auto flex h-14 w-full items-center justify-evenly border-t border-[#a3abbd] bg-white">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="noShadow">
                  <img src={editIcon} alt="Edit icon" className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleNotebookUpdate}>
                  <DialogHeader>
                    <DialogTitle>Edit Notebook</DialogTitle>
                    <DialogDescription>
                      Make changes to your notebook here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mb-3 grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">New Notebook Name</Label>
                      <Input
                        id="name-1"
                        name="name"
                        type="name"
                        defaultValue={toUpdateNotebook.notebookname}
                        onChange={handleNotebookNameChange}
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructivenoShadow">
                  <img src={deleteIcon} alt="Delete icon" className="h-6 w-6" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your notebook and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </>
  );
}

export default NotebooksBar;
