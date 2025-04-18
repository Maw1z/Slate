import { ScrollArea } from "@/components/ui/scroll-area";
import Autosaveicon from "../../assets/icons/autosave.svg";
import SummariseIcon from "../../assets/icons/summarise.svg";
import SyncIcon from "../../assets/icons/sync.svg";

function featuresSections() {
  return (
    <section className="bg-background font-Lex flex h-[50vh] w-screen items-center justify-center">
      <div className="mx-auto my-auto flex h-10/12 w-11/12 items-center justify-center gap-20 p-4">
        <ScrollArea className="rounded-base text-main-foreground border-border bg-main shadow-shadow flex h-5/6 w-1/3 border-2 p-4 px-20 py-14">
          <div className="mx-auto mb-5 h-[90px] w-[90px]">
            <img
              src={Autosaveicon}
              alt="Auto Save Icon"
              className="h-full w-full"
            />
          </div>
          <h3 className="font-Grotesk mb-1 text-center text-2xl">Auto save</h3>
          <p className="text-md text-center">
            Never lose your thoughts — your notes are saved instantly as you
            type.
          </p>
        </ScrollArea>
        <ScrollArea className="rounded-base text-main-foreground border-border bg-main shadow-shadow flex h-5/6 w-1/3 border-2 p-4 px-20 py-14">
          <div className="mx-auto mb-5 h-[90px] w-[90px]">
            <img
              src={SummariseIcon}
              alt="Auto Save Icon"
              className="h-full w-full"
            />
          </div>
          <h3 className="font-Grotesk mb-1 text-center text-2xl">
            AI Summarization
          </h3>
          <p className="text-md text-center">
            Get smart summaries of your notes with one click. Perfect for quick
            reviews.
          </p>
        </ScrollArea>
        <ScrollArea className="rounded-base text-main-foreground border-border bg-main shadow-shadow flex h-5/6 w-1/3 border-2 p-4 px-20 py-14">
          <div className="mx-auto mb-5 h-[90px] w-[90px]">
            <img
              src={SyncIcon}
              alt="Auto Save Icon"
              className="h-full w-full"
            />
          </div>
          <h3 className="font-Grotesk mb-1 text-center text-2xl">Sync</h3>
          <p className="text-md text-center">
            Access your notes anywhere, anytime. Your data stays updated across
            all your devices.
          </p>
        </ScrollArea>
      </div>
    </section>
  );
}

export default featuresSections;
