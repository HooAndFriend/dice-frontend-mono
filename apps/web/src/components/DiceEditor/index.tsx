// ** React Imports
import { memo, useEffect, useMemo, useRef } from "react";

// ** Editor Js Imports
import EditorJS from "@editorjs/editorjs";
import { tools } from "./constants";
import "./editor.css";

const DiceEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useMemo(
    () =>
      new EditorJS({
        holder: "editorjs",
        tools,
        minHeight: 30,
      }),
    []
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
