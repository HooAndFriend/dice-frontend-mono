// ** Next Imports
import dynamic from "next/dynamic";

// ** Component Imports
import CustomImage from "@/src/components/Image/CustomImage";
import { OutputData } from "@editorjs/editorjs";

// ** Utils Imports
import dayjs from "dayjs";

interface PropsType {
  content: OutputData;
  readOnly: boolean;
  setReadOnly: (readOnly: boolean) => void;
  handleSave: () => void;
  setContent: (content: OutputData) => void;
}

const DiceEditor = dynamic(() => import("@/src/components/DiceEditor"), {
  ssr: false,
});

const EditorContainerView = ({
  content,
  readOnly,
  setReadOnly,
  setContent,
  handleSave,
}: PropsType) => {
  return (
    <div className="w-full h-full p-4 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[18px]">회의록 / 2024-04-01</h1>
        <div className="flex items-center">
          <button className="w-[80px] rounded-[5px]  h-[30px] bg-slate-300">
            DELETE
          </button>
          <button
            className="w-[80px] rounded-[5px] ml-2 h-[30px] bg-slate-300"
            onClick={readOnly ? () => setReadOnly(false) : handleSave}
          >
            {readOnly ? "EDIT" : "SAVE"}
          </button>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <CustomImage
          src="/images/dice.png"
          width={30}
          height={30}
          alt="profile"
        />
        <div className="ml-4">
          <h1 className="text-gray-500 text-[14px] ">
            {dayjs().format("YYYY-MM-DD HH:mm:ss")}
          </h1>
        </div>
      </div>
      <div className="w-full overflow-y-hidden">
        <DiceEditor
          content={content}
          setContent={setContent}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default EditorContainerView;
