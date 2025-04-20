import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import logo from "../../assets/logo.svg";
import shortcutIcon from "../../assets/icons/shortcuts.svg";

function HeaderLoggedIn({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserFirstLetter = () => {
    if (!user) return;

    if (user.displayName) return user.displayName[0].toUpperCase();

    return user.email[0].toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 flex h-[70px] w-screen items-center justify-between border-b-4 bg-white p-10 px-14">
      <div className="flex items-center justify-between gap-2">
        <img src={logo} alt="Slate logo" className="h-7" />
        <h4 className="font-Grotesk text-2xl font-bold">Slate</h4>
      </div>
      <div className="flex items-center justify-center gap-7">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="neutral" size="sm" textSize="sm">
              <img src={shortcutIcon} alt="Shortcut icon" className="h-5 w-5" />
              Shortcuts
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[91vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl">All Shortcuts</DialogTitle>
              <DialogDescription className="text-md">
                We've created some handy shortcuts to make your experience
                easier and more convenient. Enjoy exploring!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              {/* Text Formatting */}
              <Label htmlFor="textformatting" className="text-lg">
                Text formatting
              </Label>
              <div className="grid w-full grid-cols-2">
                <div className="col-span-2 flex h-12 w-full items-center justify-evenly">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="bold" className="text-md">
                      Bold
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Press{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">Ctrl</span>B
                      </kbd>
                    </p>
                  </div>
                </div>

                {/* Italic */}
                <div className="col-span-2 flex h-12 w-full items-center justify-evenly">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="italic" className="text-md">
                      Italic
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Press{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">Ctrl</span>I
                      </kbd>
                    </p>
                  </div>
                </div>

                {/* Underline */}
                <div className="col-span-2 flex h-12 w-full items-center justify-evenly">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="underline" className="text-md">
                      Underline
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Press{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">Ctrl</span>U
                      </kbd>
                    </p>
                  </div>
                </div>
              </div>

              {/* Blocks & Structure */}
              <Label htmlFor="blocks" className="text-lg">
                Blocks & Structure
              </Label>
              <div className="grid w-full grid-cols-2">
                {/* Heading 1 */}
                <div className="col-span-2 flex h-12 w-full items-center justify-evenly">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="heading1" className="text-md">
                      Heading 1
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Type{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">#</span>
                      </kbd>{" "}
                      + Space
                    </p>
                  </div>
                </div>

                {/* Heading 2 */}
                <div className="col-span-2 flex h-12 w-full items-center justify-evenly">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="heading2" className="text-md">
                      Heading 2
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Type{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">##</span>
                      </kbd>{" "}
                      + Space
                    </p>
                  </div>
                </div>

                {/* Heading 3 */}
                <div className="col-span-2 mb-2 flex h-12 w-full items-center justify-evenly">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="heading3" className="text-md">
                      Heading 3
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Type{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">###</span>
                      </kbd>{" "}
                      + Space
                    </p>
                  </div>
                </div>

                {/* Bullet List */}
                <div className="col-span-2 flex h-12 w-full justify-center">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="bullet" className="text-md">
                      Bullet List
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Type{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">-</span>
                      </kbd>{" "}
                      or{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">*</span>
                      </kbd>{" "}
                      + Space
                    </p>
                  </div>
                </div>

                {/* Numbered List */}
                <div className="col-span-2 flex h-12 w-full justify-evenly">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="numbered" className="text-md">
                      Numbered List
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Type{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">1.</span>
                      </kbd>{" "}
                      + Space
                    </p>
                  </div>
                </div>

                {/* Blockquote */}
                <div className="col-span-2 flex h-12 w-full flex-grow justify-center">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="blockquote" className="text-md">
                      Blockquote
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Type{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">&gt;</span>
                      </kbd>{" "}
                      + Space
                    </p>
                  </div>
                </div>

                {/* Inline Code */}
                <div className="col-span-2 flex h-12 w-full justify-center">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="inlinecode" className="text-md">
                      Inline Code
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Wrap text in{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">
                          &lt;code&gt; &lt;/code&gt;
                        </span>
                      </kbd>
                    </p>
                  </div>
                </div>
              </div>

              {/* Editor Navigation */}
              <Label htmlFor="navigation" className="text-lg">
                Editor Navigation
              </Label>
              <div className="grid w-full grid-cols-2">
                {/* Undo */}
                <div className="col-span-2 flex w-full items-center justify-evenly">
                  <div className="flex h-12 w-3/4 items-center justify-between">
                    <Label htmlFor="undo" className="text-md">
                      Undo
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Press{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">Ctrl</span>Z
                      </kbd>
                    </p>
                  </div>
                </div>

                {/* Redo */}
                <div className="col-span-2 flex h-12 w-full items-center justify-evenly">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="redo" className="text-md">
                      Redo
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Press{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">Ctrl + Shift</span>Z
                      </kbd>
                    </p>
                  </div>
                </div>

                {/* Save */}
                <div className="col-span-2 flex h-12 w-full items-center justify-evenly">
                  <div className="flex w-3/4 items-center justify-between">
                    <Label htmlFor="save" className="text-md">
                      Save
                    </Label>
                    <p className="text-foreground mt-[2px] text-sm">
                      Press{" "}
                      <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
                        <span className="text-xs">Alt + Ctrl</span>S
                      </kbd>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="mt-1">
            <Avatar className="h-9 w-9 hover:cursor-pointer">
              <AvatarFallback>{getUserFirstLetter()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github />
              <Link to="https://github.com/Maw1z/Slate" target="_blank">
                <span>GitHub</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default HeaderLoggedIn;
