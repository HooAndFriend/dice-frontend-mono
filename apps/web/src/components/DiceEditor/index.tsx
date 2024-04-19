// ** React Imports
import { memo, useEffect, useMemo, useRef } from "react";

// ** Editor Js Imports
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { tools } from "./constants";
import "./editor.css";

interface PropsType {
  content: OutputData;
  readOnly: boolean;
  setContent: (content: OutputData) => void;
}

const DiceEditor = ({ content, setContent, readOnly }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useMemo(
    () =>
      new EditorJS({
        holder: "editorjs",
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
    [readOnly]
  );

  useEffect(() => {
    return () => {
      if (editor && editor.destroy) {
        editor.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-[750px] p-4 overflow-x-hidden overflow-y-scroll"
      id="editorjs"
    />
  );
};

export default memo(DiceEditor);
