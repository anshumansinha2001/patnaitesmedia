import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ defaultValue, onEditorChange }) {
  return (
    <div className="w-full">
      <Editor
        initialValue={defaultValue}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "image",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "anchor",
          ],
          toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={onEditorChange}
      />
    </div>
  );
}
