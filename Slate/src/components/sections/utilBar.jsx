import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import deleteIcon from "../../assets/icons/delete.svg";
import saveIcon from "../../assets/icons/save.svg";
import summarisationIcon from "../../assets/icons/summarise.svg";

function UtilBar({
  noteName,
  handleSave,
  handleDelete,
  setNewName,
  summaryText,
  handleSummary,
  handleSummaryLengthChange,
}) {
  const [animatedSummary, setAnimatedSummary] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!summaryText) return;

    setAnimatedSummary("");
    setCurrentIndex(0);

    const interval = setInterval(() => {
      setAnimatedSummary((prev) => {
        const nextChar = summaryText[prev.length];
        if (nextChar === undefined) {
          clearInterval(interval);
          return prev;
        }
        return prev + nextChar;
      });
    }, 15);

    return () => clearInterval(interval);
  }, [summaryText]);

  return (
    <div className="sticky z-10 flex h-14 w-full items-center justify-between gap-2 border-x border-b border-[#a3abbd] bg-white px-2">
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
              onClick={handleSummary}
            >
              <img
                src={summarisationIcon}
                alt="AI Summarisation Icon"
                className="h-5 w-5"
              />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex h-full flex-col">
            <SheetHeader className="-mb-5">
              <SheetTitle className="text-3xl">AI Summarisation</SheetTitle>
              <SheetDescription className="text-md">
                Here's your AI-generated summary.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-3 px-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="summary-length">Word Count</Label>
                <Select
                  onValueChange={(value) => handleSummaryLengthChange(value)}
                >
                  <SelectTrigger className="w-[220px] bg-white">
                    <SelectValue placeholder="Select summary length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-white">
                      <SelectLabel>Summary Length</SelectLabel>
                      <SelectItem value="short">Short (≈100 words)</SelectItem>
                      <SelectItem value="medium">
                        Medium (≈300 words)
                      </SelectItem>
                      <SelectItem value="detailed">
                        Detailed (≈500 words)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-3">
                <Label htmlFor="ai-summary">Summary</Label>
                <ScrollArea className="h-[700px] w-[350px] rounded-md border-2 bg-white p-4">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-2xl font-bold" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-semibold" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-2" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-semibold text-black"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1" {...props} />
                      ),
                    }}
                  >
                    {animatedSummary}
                  </ReactMarkdown>
                </ScrollArea>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default UtilBar;
