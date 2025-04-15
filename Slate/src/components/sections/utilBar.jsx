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

  return (
    <div className="z-10 flex h-12 w-[100vw] flex-col items-center justify-center border-x border-b border-[#a3abbd] bg-white">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="noShadow" size="sm">
            Edit Notebook
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
            <div className="grid gap-4">
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
    </div>
  );
}

export default UtilBar;
