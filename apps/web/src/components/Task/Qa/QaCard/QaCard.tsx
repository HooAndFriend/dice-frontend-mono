// ** React Imports
import { ChangeEvent } from "react";

// ** Component Imports
import QaComment from "../QaComment";
import QaStatusButton from "../QaStatusButton";
import QaUserButton from "../QaUserButton";
import { QaFileUploader } from "../QaFileUploader";
import QaDatePicker from "../QaDatePicker";
import QaHistory from "../QaHistory";
import ImagePreview from "../../../Image/ImagePreview";
import QaEditor from "../QaEditor";

// ** Type Imports
import { IssueInfo } from "@/src/type/qa";
import { QaCardEditMode, RoleType } from "@/src/type/common";

// ** Utils Imports
import dayjs from "dayjs";

interface PropsType {
  data: IssueInfo;
  role: RoleType;
  mode: QaCardEditMode;
  subType: "comment" | "history";
  selectImage: string;
  previewOpen: boolean;
  cancelButtonRef: any;
  setPreviewOpen: (open: boolean) => void;
  setSubType: (type: "comment" | "history") => void;
  deleteQa: () => void;
  handleUpdateQa: (type: "title" | "asIs" | "toBe" | "memo") => void;
  handleClose: () => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  refetch: () => void;
  handleDeleteQaFile: (fileId: number) => void;
  setIssueData: (value: IssueInfo) => void;
  setMode: (value: QaCardEditMode) => void;
  handlePreviewOpen: (image: string) => void;
}

const QaCardView = ({
  data,
  subType,
  role,
  mode,
  cancelButtonRef,
  selectImage,
  previewOpen,
  handleClose,
  handleInput,
  refetch,
  setSubType,
  handleDeleteQaFile,
  setIssueData,
  setMode,
  setPreviewOpen,
  handlePreviewOpen,
  deleteQa,
  handleUpdateQa,
}: PropsType) => {
  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <div className="h-[40px] flex items-center justify-between">
        <div className="flex items-center text-lg font-medium font-spoqa">
          <h1 className="mr-4 text-[18px] font-san-medium">{data.code}</h1>
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
        <div className="h-[50px] flex justify-between mt-[40px] cursor-pointer">
          <div
            className="flex items-center text-[20px] font-san-bold"
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
        <div className="h-[50px] flex justify-between mt-[40px]">
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
      <div className="h-[1px] bg-[#EBEBEC] mt-[33px]" />
      <div className="flex h-5 my-[20px]">
        <div className="flex items-center">
          <div className="font-spoqa mr-[80px] font-san-medium text-[16px]">
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
          <div className="font-spoqa mx-[80px] font-san-medium text-[16px]">
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
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]" />
      <div className="h-[20px] flex mt-[20px] ">
        <div className="font-spoqa font-san-medium mr-[80px] text-[16px]">
          regDate
        </div>
        <div className="font-spoqa font-normal text-darkGray tracking-[1px] text-[16px]">
          {dayjs(data.createdDate).format("YYYY-MM-DD")}
        </div>
        <div className="font-spoqa font-san-medium mx-[80px] text-[16px]">
          modDate
        </div>
        <div className="font-spoqa font-normal text-darkGray tracking-[1px] text-[16px]">
          {dayjs(data.modifiedDate).format("YYYY-MM-DD")}
        </div>
      </div>
      <div className="h-[40px] flex mt-5 items-center">
        <div className="font-spoqa font-san-medium mr-[60px] text-[16px]">
          due date
        </div>
        <div className="font-spoqa font-normal text-darkGray tracking-[1px] cursor-pointer">
          <QaDatePicker
            value={dayjs(data.dueDate).format("YYYY-MM-DD")}
            qaId={data.id}
          />
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]" />
      <div className="mt-5 mb-[14px] font-san-medium text-[16px]">As-Is</div>
      <QaEditor
        mode={mode.asIs}
        data={data}
        type="asIs"
        setData={setIssueData}
        setMode={(value: "edit" | "view") => setMode({ ...mode, asIs: value })}
        handleUpdateQa={handleUpdateQa}
      />
      <div className="mt-5 mb-[14px] font-san-medium text-[16px]">To-Be</div>
      <QaEditor
        mode={mode.toBe}
        data={data}
        type="toBe"
        setData={setIssueData}
        setMode={(value: "edit" | "view") => setMode({ ...mode, toBe: value })}
        handleUpdateQa={handleUpdateQa}
      />
      <div className="mt-5 mb-[14px] font-san-medium text-[16px]">Memo</div>
      <QaEditor
        mode={mode.memo}
        data={data}
        type="memo"
        setData={setIssueData}
        setMode={(value: "edit" | "view") => setMode({ ...mode, memo: value })}
        handleUpdateQa={handleUpdateQa}
      />
      <div className="mt-5 mb-[14px] text-[16px] font-san-medium">
        FILE <span className="text-sm font-spoqa text-darkGray">(MAX:4)</span>
      </div>
      <div className="flex items-center">
        {data.qaFile.length < 4 && (
          <QaFileUploader qaId={data.id} refetch={refetch} />
        )}
        {data.qaFile.map((item) => (
          <div
            className="relative w-[40px] h-[40px] mr-4 cursor-pointer"
            onClick={() => handlePreviewOpen(item.url)}
          >
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
        <QaComment qaId={data.id} />
      ) : (
        <QaHistory qaId={data.id} />
      )}
      {previewOpen && (
        <ImagePreview
          cancelButtonRef={cancelButtonRef}
          open={previewOpen}
          image={selectImage}
          setOpen={setPreviewOpen}
        />
      )}
    </div>
  );
};

export default QaCardView;
