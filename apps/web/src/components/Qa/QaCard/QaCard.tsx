// ** React Imports
import { ChangeEvent } from "react";

// ** Component Imports
import QaComment from "../QaComment";
import QaStatusButton from "../QaStatusButton";
import QaUserButton from "../QaUserButton";
import QuillEditor from "@/src/components/QuillEditor";
import { QaFileUploader } from "../QaFileUploader";
import QaDatePicker from "../QaDatePicker";

// ** Type Imports
import { IssueInfo } from "@/src/type/qa";
import { QaCardEditMode, RoleType } from "@/src/type/common";

// ** Utils Imports
import dayjs from "dayjs";

interface PropsType {
  data: IssueInfo;
  role: RoleType;
  mode: QaCardEditMode;
  deleteQa: () => void;
  handleUpdateQa: (type: "title" | "asIs" | "toBe" | "memo") => void;
  handleClose: () => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  refetch: () => void;
  handleDeleteQaFile: (fileId: number) => void;
  setIssueData: (value: IssueInfo) => void;
  setMode: (value: QaCardEditMode) => void;
}

const QaCardView = ({
  data,

  role,
  mode,
  handleClose,
  handleInput,
  refetch,
  handleDeleteQaFile,
  setIssueData,
  setMode,
  deleteQa,
  handleUpdateQa,
}: PropsType) => {
  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <div className="h-[40px] flex items-center justify-between">
        <div className="flex items-center text-lg font-medium font-spoqa">
          <h1 className="mr-4 text-[18px] font-bold">{data.code}</h1>
          {role !== "VIEWER" && (
            <p
              className="text-[12px] text-gray-500 cursor-pointer underline"
              onClick={deleteQa}
            >
              Delete
            </p>
          )}
        </div>
        <div className="flex font-bold font-spoqa">
          <h1
            className="text-[24px] font-bold ml-8 cursor-pointer"
            onClick={handleClose}
          >
            X
          </h1>
        </div>
      </div>
      {mode.title === "view" ? (
        <div className="h-[50px] flex justify-between mt-[15px] font-spoqa">
          <div
            className="flex items-center text-[20px] font-bold"
            onDoubleClick={() => {
              if (role === "VIEWER") return;
              setMode({ ...mode, title: "edit" });
            }}
          >
            {data.title.length === 0 ? "-" : data.title}
          </div>
          <QaStatusButton
            qaId={data.id}
            status={data.status}
            refetch={refetch}
          />
        </div>
      ) : (
        <div className="h-[50px] flex justify-between mt-[15px] font-spoqa">
          <div className="flex items-center w-full">
            <input
              type="text"
              value={data.title}
              name="title"
              onChange={handleInput}
              className="w-full h-[40px] border border-[#EBEBEC] rounded-[10px] px-4"
            />
            <div className="flex items-center mx-2">
              <button
                className="w-[30px] h-[30px] bg-[#623AD6] text-white rounded-[8px] flex items-center justify-center mr-2"
                onClick={() => handleUpdateQa("title")}
              >
                V
              </button>
              <button
                className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center"
                onClickCapture={() => setMode({ ...mode, title: "view" })}
              >
                X
              </button>
            </div>
          </div>
          <QaStatusButton
            qaId={data.id}
            status={data.status}
            refetch={refetch}
          />
        </div>
      )}
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="flex h-5 mt-5">
        <div className="flex items-center">
          <div className="font-spoqa mr-[80px] font-medium text-[16px]">
            Admin
          </div>
          <QaUserButton
            profile={data.admin ? data.admin.profile : "/images/dice.png"}
            nickname={data.admin ? data.admin.nickname : ""}
            email={data.admin ? data.admin.email : ""}
            width={20}
            height={20}
            type="admin"
            qaId={data.id}
          />
        </div>
        <div className="flex items-center">
          <div className="font-spoqa mx-[80px] font-medium text-[16px]">
            Worker
          </div>
          <QaUserButton
            profile={data.worker ? data.worker.profile : "/images/dice.png"}
            nickname={data.worker ? data.worker.nickname : ""}
            email={data.worker ? data.worker.email : ""}
            width={20}
            height={20}
            type="user"
            qaId={data.id}
          />
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="h-[20px] flex mt-5 ">
        <div className="font-spoqa font-medium mr-[80px] text-[16px]">
          regDate
        </div>
        <div className="font-spoqa font-normal text-darkGray tracking-[1px] text-[16px]">
          {dayjs(data.createdDate).format("YYYY-MM-DD")}
        </div>
        <div className="font-spoqa font-medium mx-[80px] text-[16px]">
          modDate
        </div>
        <div className="font-spoqa font-normal text-darkGray tracking-[1px] text-[16px]">
          {dayjs(data.modifiedDate).format("YYYY-MM-DD")}
        </div>
      </div>
      <div className="h-[20px] flex mt-5 ">
        <div className="font-spoqa font-medium mr-[60px] text-[16px]">
          due date
        </div>
        <div className="font-spoqa font-normal text-darkGray tracking-[1px]">
          <QaDatePicker
            value={dayjs(data.dueDate).format("YYYY-MM-DD")}
            qaId={data.id}
          />
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="mt-5 mb-[14px] text-[16px]">As-Is</div>
      {mode.asIs === "view" ? (
        <div
          dangerouslySetInnerHTML={{ __html: data.asIs }}
          className="p-4 border border-[#EBEBEC] h-[80px] w-full rounded-[10px] overflow-y-auto"
          onDoubleClick={() => {
            if (role === "VIEWER") return;
            setMode({ ...mode, asIs: "edit" });
          }}
        />
      ) : (
        <div>
          <QuillEditor
            value={data.asIs}
            onChange={(value: string) =>
              setIssueData({ ...data, asIs: value } as IssueInfo)
            }
            name="asIs"
          />
          <div className="flex items-center mt-2">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              onClick={() => handleUpdateQa("asIs")}
            >
              save
            </button>
            <button
              className="w-[60px] h-[30px] flex items-center justify-center rounded-[8px]"
              onClickCapture={() => setMode({ ...mode, asIs: "view" })}
            >
              cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 mb-[14px] text-[16px]">To-Be</div>
      {mode.toBe === "view" ? (
        <div
          dangerouslySetInnerHTML={{ __html: data.toBe }}
          className="p-4 border border-[#EBEBEC] h-[80px] w-full rounded-[10px] overflow-y-auto"
          onDoubleClick={() => {
            if (role === "VIEWER") return;
            setMode({ ...mode, toBe: "edit" });
          }}
        />
      ) : (
        <div>
          <QuillEditor
            value={data.toBe}
            onChange={(value: string) =>
              setIssueData({ ...data, toBe: value } as IssueInfo)
            }
            name="toBe"
          />
          <div className="flex items-center mt-2">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              onClick={() => handleUpdateQa("toBe")}
            >
              save
            </button>
            <button
              className="w-[60px] h-[30px] flex items-center justify-center rounded-[8px]"
              onClickCapture={() => setMode({ ...mode, toBe: "view" })}
            >
              cancel
            </button>
          </div>
        </div>
      )}
      <div className="mt-5 mb-[14px] text-[16px]">Memo</div>
      {mode.memo === "view" ? (
        <div
          dangerouslySetInnerHTML={{ __html: data.memo }}
          className="p-4 border border-[#EBEBEC] h-[80px] w-full rounded-[10px] overflow-y-auto"
          onDoubleClick={() => {
            if (role === "VIEWER") return;
            setMode({ ...mode, memo: "edit" });
          }}
        />
      ) : (
        <div>
          <QuillEditor
            value={data.memo}
            onChange={(value: string) =>
              setIssueData({ ...data, memo: value } as IssueInfo)
            }
            name="memo"
          />
          <div className="flex items-center mt-2">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              onClick={() => handleUpdateQa("memo")}
            >
              save
            </button>
            <button
              className="w-[60px] h-[30px] flex items-center justify-center rounded-[8px]"
              onClickCapture={() => setMode({ ...mode, memo: "view" })}
            >
              cancel
            </button>
          </div>
        </div>
      )}
      <div className="mt-5 mb-[14px] text-[16px]">
        FILE <span className="text-sm font-spoqa text-darkGray">(MAX:4)</span>
      </div>
      <div className="flex items-center">
        {data.qaFile.length < 4 && (
          <QaFileUploader qaId={data.id} refetch={refetch} />
        )}
        {data.qaFile.map((item) => (
          <div className="relative w-[40px] h-[40px] mr-4">
            <img
              src={item.url}
              alt="Description"
              className="absolute inset-0 w-full h-full rounded-[6px] bg-[#D9E0FF]"
            />
            <h1
              className="absolute px-2 py-1 m-1 text-xs leading-none text-white bg-black rounded-full cursor-pointer -right-2 -top-2"
              onClick={() => handleDeleteQaFile(item.id)}
            >
              X
            </h1>
          </div>
        ))}
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]" />
      <QaComment qaId={data.id} />
    </div>
  );
};

export default QaCardView;
