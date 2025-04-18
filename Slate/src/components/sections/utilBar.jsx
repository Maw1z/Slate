import { Button } from "@/components/ui/button";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import deleteIcon from "../../assets/icons/delete.svg";
import saveIcon from "../../assets/icons/save.svg";
import summarisationIcon from "../../assets/icons/summarise.svg";

function UtilBar({ noteName, handleSave, handleDelete, setNewName }) {
  return (
    <div className="z-10 flex h-14 w-full items-center justify-between gap-2 border-x border-b border-[#a3abbd] bg-white px-2">
      <div>
        <Input
          className="w-[200px]"
          type="name"
          value={noteName}
          onChange={setNewName}
        />
      </div>

      <div className="flex gap-2">
        <Button variant="noShadow" size="sm" className="hover:cursor-pointer">
          <img
            src={saveIcon}
            alt="Delete icon"
            className="h-5 w-5"
            onClick={handleSave}
          />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructivenoShadow"
              size="sm"
              className="hover:cursor-pointer"
            >
              <img src={deleteIcon} alt="Delete icon" className="h-5 w-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete{" "}
                <b>{noteName}</b> and remove it from our servers.
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
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="noShadow"
              size="sm"
              className="hover:cursor-pointer"
            >
              <img
                src={summarisationIcon}
                alt="AI Summarisation Icon"
                className="h-5 w-5"
              />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Name</Label>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Username</Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button variant="neutral">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default UtilBar;
