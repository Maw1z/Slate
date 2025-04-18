import { useRef, useEffect } from "react";
import axios from "axios";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  codeBlockPlugin,
  tablePlugin,
  thematicBreakPlugin,
  linkDialogPlugin,
  UndoRedo,
  BlockTypeSelect,
  ListsToggle,
  CodeToggle,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
} from "@mdxeditor/editor";
import { useHotkeys } from "react-hotkeys-hook";

const ToolbarSeparator = () => (
  <div
    style={{
      width: "1px",
      height: "24px",
      backgroundColor: "#ccc",
      margin: "0 8px",
    }}
  />
);

function Editor({ handleUpdate, selectedNotebookId, selectedNoteId }) {
  const editorRef = useRef(null);
  useEffect(() => {
    const fetchContent = async () => {
      if (!selectedNotebookId || !selectedNoteId) return;
      console.log(selectedNoteId);

      const retrievedContent = await handleUpdateEditorContent();
      if (editorRef.current) {
        const safeContent =
          typeof retrievedContent === "string" && retrievedContent.trim() !== ""
            ? retrievedContent
            : "# Start writing...";

        editorRef.current.setMarkdown(safeContent);
      }
    };

    fetchContent();
  }, [selectedNoteId]);

  const handleSave = async () => {
    if (editorRef.current) {
      const mdx = await editorRef.current.getMarkdown();
      console.log("mdx content:", mdx);
      handleUpdateNoteContent(mdx);
    }
  };

  useHotkeys("ctrl+alt+s", (event) => {
    event.preventDefault();
    handleSave();
    console.log("Saved!");
  });

  const handleUpdateNoteContent = async (content) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/notes/notebooks/${selectedNotebookId}/${selectedNoteId}`,
        {
          NoteName: "Testtt",
          NoteContent: content,
        },
      );
      console.log("Note saved:", res.data);
      handleUpdate({ message: "Note saved!" });
    } catch (error) {
      console.error("Error saving note:", error.message);
      handleUpdate({
        message: "Error saving note",
        error: error.message,
      });
    }
  };

  const handleUpdateEditorContent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/notes/notebooks/${selectedNotebookId}/${selectedNoteId}`,
      );
      console.log(res.data.note.notecontent);
      const content = res.data.note.notecontent;
      return content;
    } catch (error) {
      console.log("Error retrieving note:", error.message);
      handleUpdate({
        message: "Error retrieving note",
        error: error.message,
      });
    }
  };
  return (
    <div>
      <MDXEditor
        ref={editorRef}
        markdown=""
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <ToolbarSeparator />

                <BlockTypeSelect />
                <ToolbarSeparator />

                <ListsToggle />
                <CodeToggle />
                <ToolbarSeparator />

                <CreateLink />
                <InsertTable />
                <InsertThematicBreak />
              </>
            ),
          }),
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          codeBlockPlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          linkDialogPlugin(),
          markdownShortcutPlugin(),
        ]}
      />
    </div>
  );
}

export default Editor;
