import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const ReadOnlyEditor = ({ contentJSON }) => {
  const editor = useEditor({
    editable: false, 
    extensions: [StarterKit],
    content: contentJSON,
  });

  if (!editor) return null;

  return (
    <EditorContent
      editor={editor}
      className="prose dark:prose-invert max-w-none p-2 bg-white dark:bg-gray-900 rounded"
    />
  );
};

export default ReadOnlyEditor;