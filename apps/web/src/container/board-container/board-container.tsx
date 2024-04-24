// ** Next Imports
import dynamic from "next/dynamic";

// ** Component Imports
import CustomImage from "@/src/components/Image/CustomImage";
import { OutputData } from "@editorjs/editorjs";

// ** Utils Imports
import dayjs from "dayjs";
import { BoardDetail } from "@/src/type/board";

interface PropsType {
  content: OutputData;
  readOnly: boolean;
  board: BoardDetail;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setReadOnly: (readOnly: boolean) => void;
  handleSave: () => void;
  handleDelete: () => void;
  setContent: (content: OutputData) => void;
}

const DiceEditor = dynamic(() => import("@/src/components/DiceEditor"), {
  ssr: false,
});

const EditorContainerView = ({
  content,
  readOnly,
  board,
  handleInput,
  setReadOnly,
  setContent,
  handleSave,
  handleDelete,
}: PropsType) => {
  return (
    <div className="w-full h-full p-4 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[18px]">
          {board.parent
            ? `${board.parent.title} / ${board.title}`
            : board.title}
        </h1>
        <div className="flex items-center">
          <button
            className="w-[80px] rounded-[5px]  h-[30px] bg-slate-300"
            onClick={handleDelete}
          >
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
          src={board.createdUser.profile}
          width={30}
          height={30}
          alt="profile"
        />
        <div className="ml-4">
          <h1 className="text-[14px] ">{board.createdUser.nickname}</h1>
          <h1 className="text-gray-500 text-[12px] ">
            {dayjs().format("YYYY-MM-DD HH:mm:ss")}
          </h1>
        </div>
      </div>
      <div className="w-full mt-8">
        <input
          type="text"
          placeholder="Enter Title"
          value={board.title}
          onChange={handleInput}
          name="title"
          className="h-[40px] w-[600px] border-none"
        />
      </div>
      <div className="w-full overflow-y-hidden">
        <DiceEditor
          boardId={board.id}
          content={content}
          setContent={setContent}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default EditorContainerView;
