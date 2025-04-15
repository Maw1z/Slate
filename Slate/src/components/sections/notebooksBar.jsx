import addIcon from "../../assets/icons/add.svg";
import { Skeleton } from "@/components/ui/skeleton";

function notebooksBar({ visibility, loading, notebooks, onSelectNotebook }) {
  return (
    <>
      {visibility && (
        <div className="bg-background font-Grotesk scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-black scrollbar-thin scrollbar-track-background h-full w-44 overflow-y-auto border-r border-[#a3abbd]">
          <div className="hover:bg-main flex h-14 w-full items-center justify-center gap-1 border-b border-[#a3abbd] bg-white font-semibold">
            <img src={addIcon} alt="Plus" className="w-6" />
            Add Notebook
          </div>
          {notebooks.map((book) => (
            <button
              key={book.notebookid}
              className="hover:bg-main focus:bg-main flex h-14 w-full items-center rounded-none border-b border-[#a3abbd] bg-white px-5 focus:border-2 focus:border-black focus:font-bold"
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

export default notebooksBar;
