// src/app/blog/addblog/TiptapEditor.jsx

"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="bg-white p-4 border rounded">
      <EditorContent editor={editor} />
    </div>
  );
}
