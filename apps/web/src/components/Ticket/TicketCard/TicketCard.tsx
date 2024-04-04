// ** React Imports
import { KeyboardEvent } from "react";

// ** Components Imports
import CustomInput from "../../Input/CustomInput";
import TicketComment from "../TicketComment";
import TicketStatusButton from "../TicketStatusButton";
import QuillEditor from "../../QuillEditor";
import TicketDatePicker from "../TicketDatePicker";

// ** Type Imports
import { TicketEditMode, TicketInfo } from "@/src/type/ticket";
import { RoleType } from "@/src/type/common";

// ** Utils Imports
import dayjs from "dayjs";

interface PropsType {
  data: TicketInfo;
  mode: TicketEditMode;
  role: RoleType;
  comment: string;
  handleComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCommentEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
  setMode: (mode: TicketEditMode) => void;
  setData: (data: TicketInfo) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  handleSaveTicketComment: () => void;
}

const TicketCardView = ({
  data,
  role,
  mode,
  comment,
  handleComment,
  onChange,
  setData,
  setMode,
  handleClose,
  handleSaveTicketComment,
  handleCommentEnter,
}: PropsType) => {
  return (
    <div className="mt-6 h-[530px] overflow-y-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8 overflow-x-hidden">
      <div className="flex items-center justify-between">
        <h1>{data.code}</h1>
        <div className="flex items-center">
          <p className="text-[12px] text-gray-500 cursor-pointer underline">
            Delete
          </p>
          <h1
            className="text-[24px] font-bold cursor-pointer"
            onClick={handleClose}
          >
            X
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-between mt-[30px]">
        <h1>{data.name}</h1>
        <TicketStatusButton status={data.status} ticketId={data.id} />
      </div>
      <hr className="my-[20px]" />
      <div className="flex items-center">
        <div className="w-[110px]">
          <h1>Type</h1>
        </div>
        <div className="flex items-center">
          <h3>SCREEN</h3>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[110px]">
          <h1>Admin</h1>
        </div>
        <div className="flex items-center">
          <h3>{data.admin ? data.admin.nickname : "-"}</h3>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[110px]">
          <h1>Worker</h1>
        </div>
        <div className="flex items-center">
          <h3>{data.worker ? data.worker.nickname : "-"}</h3>
        </div>
      </div>
      <hr className="my-[20px]" />
      <div className="flex items-center">
        <h1 className="w-[110px]">RegDate</h1>
        <h3>{dayjs(data.createdDate).format("YYYY-MM-DD HH:mm:ss")}</h3>
      </div>
      <div className="flex items-center mt-1">
        <h1 className="w-[110px]">ModDate</h1>
        <h3>{dayjs(data.modifiedDate).format("YYYY-MM-DD HH:mm:ss")}</h3>
      </div>
      <div className="flex items-center mt-1">
        <h1 className="w-[110px]">DueDate</h1>

        {mode.dueDate === "view" ? (
          <h3
            onDoubleClick={() => {
              if (role === "VIEWER") return;
              setMode({ ...mode, dueDate: "edit" });
            }}
            className="cursor-pointer "
          >
            {data.dueDate ? dayjs(data.modifiedDate).format("YYYY-MM-DD") : "-"}
          </h3>
        ) : (
          <TicketDatePicker
            ticketId={data.id}
            value={dayjs(data.dueDate).format("YYYY-MM-DD")}
          />
        )}
      </div>
      <div className="flex items-center mt-1">
        <h1 className="w-[110px]">ComDate</h1>
        <h3>
          {data.completeDate
            ? dayjs(data.completeDate).format("YYYY-MM-DD HH:mm:ss")
            : "-"}
        </h3>
      </div>
      <hr className="my-[20px]" />
      <h1 className="mb-4">Story Point</h1>
      {mode.storypoint === "view" ? (
        <div
          className="h-[40px] rounded-[10px] border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4 cursor-pointer"
          onDoubleClick={() => {
            if (role === "VIEWER") return;
            setMode({ ...mode, storypoint: "edit" });
          }}
        >
          {data.storypoint}
        </div>
      ) : (
        <div>
          <CustomInput
            width="480px"
            height="40px"
            borderRadius="10px"
            value={data.storypoint}
            name="storypoint"
            type="number"
            onChange={onChange}
          />
          <div className="flex items-center mt-2">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              // onClick={() => handleUpdateQa("asIs")}
            >
              save
            </button>
            <button
              className="w-[60px] h-[30px] flex items-center justify-center rounded-[8px]"
              onClickCapture={() => setMode({ ...mode, storypoint: "view" })}
            >
              cancel
            </button>
          </div>
        </div>
      )}
      <h1 className="my-4">Content</h1>
      {mode.content === "view" ? (
        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="p-4 border border-[#EBEBEC] h-[80px] w-full rounded-[10px] overflow-y-auto"
          onDoubleClick={() => {
            if (role === "VIEWER") return;
            setMode({ ...mode, content: "edit" });
          }}
        />
      ) : (
        <div>
          <QuillEditor
            value={data.content}
            onChange={(value: string) =>
              setData({ ...data, content: value } as TicketInfo)
            }
            name="asIs"
          />
          <div className="flex items-center mt-2">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              // onClick={() => handleUpdateQa("asIs")}
            >
              save
            </button>
            <button
              className="w-[60px] h-[30px] flex items-center justify-center rounded-[8px]"
              onClickCapture={() => setMode({ ...mode, content: "view" })}
            >
              cancel
            </button>
          </div>
        </div>
      )}
      <h1 className="my-4">File</h1>
      <div className="w-[40px] h-[40px] bg-green-300 rounded-lg"></div>
      <hr className="my-[20px]" />
      <div className="flex mt-5">
        <input
          id="content"
          onChange={handleComment}
          value={comment}
          className="px-4 w-full border border-lightGray rounded-[10px] mr-[10px]"
          onKeyDown={handleCommentEnter}
        />
        <div
          onClick={handleSaveTicketComment}
          className="w-[40px] h-[40px] bg-black text-white rounded-[10px] flex justify-center items-center"
        >
          <img src="/images/plus.png" width={24} height={24} />
        </div>
      </div>
      <TicketComment />
      <TicketComment />
    </div>
  );
};

export default TicketCardView;
