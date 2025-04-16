import { useState, useEffect } from "react";
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
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";

function UtilBar({ handleUpdate, notebookID }) {
  const [toUpdateNotebook, setToUpdateNotebook] = useState({});
  const [updatedNotebookName, setUpdatedNotebookName] = useState("");

  const handleNotebookNameChange = (e) => {
    setUpdatedNotebookName(e.target.value);
  };

  const handleNotebookUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/notebooks/${notebookID}`,
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

  useEffect(() => {
    const fetchSpecificNotebook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/notebooks/${notebookID}`,
        );
        setToUpdateNotebook(res.data.notebook);
      } catch (error) {
        console.log("Error fetching notebook", error.message);
      }
    };
    fetchSpecificNotebook();
  }, [notebookID]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/notebooks/${notebookID}`,
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
    <div className="z-10 flex h-12 w-[100vw] items-center justify-center border-x border-b border-[#a3abbd] bg-white">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="noShadow" size="sm">
            <img src={editIcon} alt="Edit icon" className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleNotebookUpdate}>
            <DialogHeader>
              <DialogTitle>Edit Notebook</DialogTitle>
              <DialogDescription>
                Make changes to your notebook here. Click save when you&apos;re
                done.
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
          <Button variant="destructivenoShadow" size="sm">
            <img src={deleteIcon} alt="Delete icon" className="h-5 w-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              notebook and remove your data from our servers.
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
  );
}

export default UtilBar;
