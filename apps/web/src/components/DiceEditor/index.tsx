// ** React Imports
import { memo, useEffect, useMemo, useRef } from "react";

// ** Editor Js Imports
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { tools } from "./constants";
import "./editor.css";

interface PropsType {
  boardId: number;
  content: OutputData;
  readOnly: boolean;
  setContent: (content: OutputData) => void;
}

const DiceEditor = ({ boardId, content, setContent, readOnly }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useMemo(
    () =>
      new EditorJS({
        holder: `editorjs-${boardId}`,
        tools,
        readOnly,
        minHeight: 30,
        data: content,
        autofocus: true,
        placeholder: "Let`s write an awesome story!",
        onChange: (api) => {
          !api.readOnly.isEnabled &&
            api.saver.save().then(async (content) => {
              setContent(content);
            });
        },
      }),
    [readOnly, boardId]
  );

  useEffect(() => {
    return () => {
      if (editor && editor.destroy) {
        editor.destroy();
      }
    };
  }, [readOnly, boardId]);

  return (
    <div
      ref={ref}
      className="w-full h-[750px] py-4 px-16 overflow-x-hidden overflow-y-scroll"
      id={`editorjs-${boardId}`}
    />
  );
};

export default memo(DiceEditor);
