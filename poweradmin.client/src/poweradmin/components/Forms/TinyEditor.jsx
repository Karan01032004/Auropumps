import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "../../context/ThemeContext";

const TinyEditor = ({ value, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Editor
            key={theme} // 🔥 re-mount on toggle
            apiKey="e3grcdgisww3mze8icv0y8dr44b0f3a60zsayukims6se43h"
            value={value}
            init={{
                height: 250,
                menubar: false,

                skin: isDark ? "oxide-dark" : "oxide",
                content_css: isDark ? "dark" : "default",

                plugins: [
                    "anchor",
                    "autolink",
                    "charmap",
                    "codesample",
                    "emoticons",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "wordcount",
                    "code",
                ],

                toolbar:
                    "undo redo | blocks | bold italic underline | " +
                    "bullist numlist | link media table | emoticons charmap | code",
            }}
            onEditorChange={(content) => onChange?.(content)}
        />
    );
};

export default TinyEditor;
