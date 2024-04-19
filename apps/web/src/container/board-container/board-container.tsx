import EditorJS from "@editorjs/editorjs";
import { useEffect, useMemo, useRef } from "react";

interface PropsType {}

const EditorContainerView = ({}: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useMemo(
    () =>
      new EditorJS({
        holder: "editorjs",
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
    <div className="w-full bg-[#FAFAFB] p-5">
      <div
        ref={ref}
        className="w-[500px] h-[500px] bg-blue-200"
        id="editorjs"
      ></div>
    </div>
  );
};

export default EditorContainerView;
