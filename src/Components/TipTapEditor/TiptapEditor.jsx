import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef, useEffect } from "react";

const TipTapEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
    ],
    content: value || {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [],
        },
      ],
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] border border-gray-800 dark:border-gray-400 focus:outline-none p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded focus:border-gray-900 dark:focus:border-gray-400",
      },
    },
  });

  const hasInitialized = useRef(false);

  // Set content only on mount (or external reset)
  useEffect(() => {
    if (editor && !hasInitialized.current) {
      editor.commands.setContent(value);
      hasInitialized.current = true;
    }
  }, [editor, value]);

  // Send updates to parent
  useEffect(() => {
    if (!editor) return;
    editor.on("update", () => {
      onChange(editor.getJSON());
    });
  }, [editor, onChange]);

  return <EditorContent editor={editor} />;
};


export default TipTapEditor;