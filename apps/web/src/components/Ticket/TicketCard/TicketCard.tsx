// ** Components Imports
import CustomInput from "../../Input/CustomInput";
import TicketStatusButton from "../TicketStatusButton";
import QuillEditor from "../../QuillEditor";
import TicketDatePicker from "../TicketDatePicker";
import TicketFileUploader from "../TicketFileUploader";
import TicketUserButton from "../TicketUserButton";
import TicketSettingButton from "../TicketSettingButton";

// ** Type Imports
import { TicketEditMode, TicketInfo } from "@/src/type/ticket";
import { RoleType } from "@/src/type/common";

// ** Utils Imports
import dayjs from "dayjs";
import TicketComment from "../TicketComment";
import TicketHistory from "../TicketHistory";

interface PropsType {
  data: TicketInfo;
  mode: TicketEditMode;
  role: RoleType;
  subType: "comment" | "history";
  setSubType: (type: "comment" | "history") => void;
  setMode: (mode: TicketEditMode) => void;
  setData: (data: TicketInfo) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ticketRefetch: () => void;
  handleClose: () => void;
  handleDeleteTicketFile: (id: number) => void;
  handleUpdateTicket: (value: "content" | "name" | "storypoint") => void;
}

const TicketCardView = ({
  data,
  role,
  mode,
  subType,
  setSubType,
  onChange,
  setData,
  setMode,
  handleClose,
  ticketRefetch,
  handleDeleteTicketFile,
  handleUpdateTicket,
}: PropsType) => {
  return (
    <div className="mt-6 h-[700px] overflow-y-auto w-full bg-white rounded-[20px] shadow-md p-[24px] overflow-x-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TicketSettingButton data={data} isText={false} />
          <h1 className="ml-4 text-[18px] font-bold">{data.code}</h1>
        </div>
        <div className="flex items-center">
          <p className="text-[12px] text-gray-500 cursor-pointer underline">
            Delete
          </p>
          <h1
            className="text-[24px] font-bold cursor-pointer ml-4"
            onClick={handleClose}
          >
            X
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-between mt-[30px]">
        {mode.name === "view" ? (
          <h1
            onDoubleClick={() => {
              if (role === "VIEWER") return;
              setMode({ ...mode, name: "edit" });
            }}
            className="h-full cursor-pointer min-w-1/2 text-[16px]"
          >
            {data.name.length === 0 ? "-" : data.name}
          </h1>
        ) : (
          <div className="flex items-center w-full font-bold">
            <input
              type="text"
              value={data.name}
              name="name"
              onChange={onChange}
              className="w-full h-[40px] border border-[#EBEBEC] rounded-[10px] px-4"
            />
            <div className="flex items-center mx-2">
              <button
                className="w-[30px] h-[30px] bg-[#623AD6] text-white rounded-[8px] flex items-center justify-center mr-2"
                onClick={() => handleUpdateTicket("name")}
              >
                V
              </button>
              <button
                className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center"
                onClickCapture={() => setMode({ ...mode, name: "view" })}
              >
                X
              </button>
            </div>
          </div>
        )}
        <TicketStatusButton status={data.status} ticketId={data.id} />
      </div>
      <hr className="my-[20px]" />
      <div className="flex items-center">
        <div className="w-[110px]">
          <h1 className="text-[16px]">Type</h1>
        </div>
        <div className="flex items-center">
          <TicketSettingButton data={data} isText />
        </div>
      </div>
      <div className="flex items-center mt-[20px]">
        <div className="w-[110px]">
          <h1 className="text-[16px]">Admin</h1>
        </div>
        <div className="flex items-center">
          <h3 className="text-[16px]">
            <TicketUserButton
              profile={data.admin ? data.admin.profile : "/images/dice.png"}
              ticketId={data.id}
              nickname={data.admin ? data.admin.nickname : "-"}
              userId={data.admin ? data.admin.id : 0}
              type="user"
              isNickname={true}
            />
          </h3>
        </div>
      </div>
      <div className="flex items-center mt-[20px]">
        <div className="w-[110px]">
          <h1 className="text-[16px]">Worker</h1>
        </div>
        <div className="flex items-center">
          <TicketUserButton
            profile={data.worker ? data.worker.profile : "/images/dice.png"}
            ticketId={data.id}
            nickname={data.worker ? data.worker.nickname : "-"}
            userId={data.worker ? data.worker.id : 0}
            type="user"
            isNickname={true}
          />
        </div>
      </div>
      <hr className="my-[20px]" />
      <div className="flex items-center">
        <h1 className="w-[110px] text-[16px]">RegDate</h1>
        <h3 className="text-[16px]">
          {dayjs(data.createdDate).format("YYYY-MM-DD HH:mm:ss")}
        </h3>
      </div>
      <div className="flex items-center mt-[20px]">
        <h1 className="w-[110px] text-[16px]">ModDate</h1>
        <h3 className="text-[16px]">
          {dayjs(data.modifiedDate).format("YYYY-MM-DD HH:mm:ss")}
        </h3>
      </div>
      <div className="flex items-center mt-[20px]">
        <h1 className="w-[110px] text-[16px]">DueDate</h1>
        <TicketDatePicker
          ticketId={data.id}
          value={data.dueDate ? dayjs(data.dueDate).format("YYYY-MM-DD") : ""}
        />
      </div>
      <div className="flex items-center mt-[20px]">
        <h1 className="w-[110px] text-[16px]">ComDate</h1>
        <h3 className="text-[16px]">
          {data.completeDate
            ? dayjs(data.completeDate).format("YYYY-MM-DD HH:mm:ss")
            : "-"}
        </h3>
      </div>
      <hr className="my-[20px]" />
      <h1 className="mb-4 text-[16px]">Story Point</h1>
      {mode.storypoint === "view" ? (
        <div
          className="h-[40px] rounded-[10px] border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4 cursor-pointer text-[16px]"
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
              onClick={() => handleUpdateTicket("storypoint")}
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
      <h1 className="my-4 text-[16px]">Content</h1>
      {mode.content === "view" ? (
        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="p-4 border border-[#EBEBEC] h-[80px] w-full rounded-[10px] overflow-y-auto text-[16px]"
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
              onClick={() => handleUpdateTicket("content")}
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
      <h1 className="my-4 text-[16px]">File</h1>
      <div className="flex items-center">
        {data.ticketFile.length < 4 && (
          <TicketFileUploader ticketId={data.id} refetch={ticketRefetch} />
        )}
        {data.ticketFile.map((item) => (
          <div className="relative w-[40px] h-[40px] mr-4">
            <img
              src={item.url}
              alt="Description"
              className="absolute inset-0 w-full h-full rounded-[6px] bg-[#D9E0FF]"
            />
            <h1
              className="absolute px-2 py-1 m-1 text-xs leading-none text-white bg-black rounded-full cursor-pointer -right-2 -top-2"
              onClick={() => handleDeleteTicketFile(item.id)}
            >
              X
            </h1>
          </div>
        ))}
      </div>
      <hr className="my-[20px]" />
      <div className="flex items-center">
        <button
          className="text-[12px] px-2 h-[30px] rounded-lg mr-2"
          style={{
            backgroundColor: subType === "comment" ? "#623AD6" : "white",
            color: subType === "comment" ? "white" : "#623AD6",
          }}
          onClick={() => setSubType("comment")}
        >
          comment
        </button>
        <button
          className="text-[12px] px-2 h-[30px] rounded-lg"
          style={{
            backgroundColor: subType === "history" ? "#623AD6" : "white",
            color: subType === "history" ? "white" : "#623AD6",
          }}
          onClick={() => setSubType("history")}
        >
          history
        </button>
      </div>
      {subType === "comment" ? (
        <TicketComment ticketId={data.id} />
      ) : (
        <TicketHistory ticketId={data.id} />
      )}
    </div>
  );
};

export default TicketCardView;
