"use client";

import { useTheme } from "next-themes";
import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
  useBlockNote
} from "@blocknote/react";
import "@blocknote/react/style.css";
//import "@blocknote/react/blocknote.css";

import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ 
      file
    });

    return response.url;
  }

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent) as PartialBlock[] 
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload
  })

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={{
          colors: {
            editor: {
              background: "var(--bn-colors-editor-background)",
              text: "secondary",
//              text: "#5d8aa8",
            },
//            menu: {
//              background: "var(--bn-colors-selected-background)",
//              text: "secondary",
//            }
//            tooltop: {
//              background: "var(--bn-colors-selected-background)",
//              text: "secondary",
//            }
          }
        }}
      />
    </div>
  )
}

export default Editor;
