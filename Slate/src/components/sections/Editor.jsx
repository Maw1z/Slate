import { useEffect } from "react";
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

function Editor({
  handleUpdate,
  ref,
  selectedNotebookId,
  selectedNoteId,
  handleSave,
}) {
  useEffect(() => {
    const fetchContent = async () => {
      if (!selectedNotebookId || !selectedNoteId) return;

      const retrievedContent = await handleUpdateEditorContent();
      if (ref.current) {
        const safeContent =
          typeof retrievedContent === "string" && retrievedContent.trim() !== ""
            ? retrievedContent
            : "# Start writing...";

        ref.current.setMarkdown(safeContent);
      }
    };

    fetchContent();
  }, [selectedNoteId]);

  const handleUpdateEditorContent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/notes/notebooks/${selectedNotebookId}/${selectedNoteId}`,
      );
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
        ref={ref}
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
