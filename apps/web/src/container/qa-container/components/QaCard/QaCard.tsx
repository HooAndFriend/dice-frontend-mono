// ** React Imports
import { ChangeEvent, KeyboardEvent } from "react";

// ** Component Imports
import QaComment from "../QaComment";
import QaStatusButton from "../QaStatusButton";
import QaUserButton from "../QaUserButton";

// ** Type Imports
import { CommentInfo, IssueInfo } from "@/src/type/qa";
import { QaCardEditMode, RoleType } from "@/src/type/common";
import { QaFileUploader } from "../QaFileUploader";
import QuillEditor from "@/src/components/QuillEditor";

interface PropsType {
  data: IssueInfo;
  commentData: CommentInfo[];
  comment: string;
  role: RoleType;
  mode: QaCardEditMode;
  deleteQa: () => void;
  handleUpdateQa: (type: "title" | "asIs" | "toBe" | "memo") => void;
  handleComment: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAddComment: () => void;
  handleClose: () => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCommentEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
  refetch: () => void;
  handleDeleteQaFile: (fileId: number) => void;
  commentRefetch: () => void;
  setIssueData: (value: IssueInfo) => void;
  setMode: (value: QaCardEditMode) => void;
}

const QaCardView = ({
  data,
  commentData,
  comment,
  role,
  mode,
  handleComment,
  handleAddComment,
  handleClose,
  handleInput,
  handleCommentEnter,
  refetch,
  handleDeleteQaFile,
  commentRefetch,
  setIssueData,
  setMode,
  deleteQa,
  handleUpdateQa,
}: PropsType) => {
  return (
    <div>
      <div className="h-[40px] flex items-center justify-between">
        <div className="text-lg font-medium font-spoqa">{data.number}</div>
        <div className="flex font-bold font-spoqa">
          {role !== "VIEWER" && (
            <div className="flex">
              <button
                className="w-[110px] h-[40px] rounded-[30px] bg-black text-white flex justify-center items-center cursor-pointer"
                onClick={deleteQa}
              >
                <img
                  className="mr-[5px]"
                  src="/images/Trash_Full.png"
                  width={24}
                  height={24}
                />
                <div className="flex items-center">Delete</div>
              </button>
            </div>
          )}
          <h1
            className="text-[24px] font-bold ml-8 cursor-pointer"
            onClick={handleClose}
          >
            X
          </h1>
        </div>
      </div>
      {mode.title === "view" ? (
        <div className="h-[50px] flex justify-between mt-[30px] font-spoqa">
          <div
            className="flex items-center text-xl font-bold"
            onDoubleClick={() => {
              if (role === "VIEWER") return;
              setMode({ ...mode, title: "edit" });
            }}
          >
            {data.title}
          </div>
          <QaStatusButton
            qaId={data.id}
            status={data.status}
            refetch={refetch}
          />
        </div>
      ) : (
        <div className="h-[50px] flex justify-between mt-[30px] font-spoqa">
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
                className="w-[30px] h-[30px] bg-blue-200 rounded-sm mr-2"
                onClick={() => handleUpdateQa("title")}
              >
                V
              </button>
              <button
                className="w-[30px] h-[30px] bg-black text-white rounded-sm"
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
      <div className="flex justify-between h-5 mt-5">
        <div className="font-spoqa mr-[79px] font-medium">Admin</div>
        <QaUserButton
          profile={data.admin ? data.admin.profile : "/dice.png"}
          nickname={data.admin ? data.admin.nickname : ""}
          width={20}
          height={20}
          type="admin"
          qaId={data.id}
        />
        <div className="font-spoqa mr-[80px] font-medium">Worker</div>
        <QaUserButton
          profile="/faviconGray.png"
          nickname="NoWorker"
          width={20}
          height={20}
          type="user"
          qaId={data.id}
        />
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="h-[20px] flex mt-5 ">
        <div className="font-spoqa font-medium mr-[65px]">RegDate</div>
        <div className="font-spoqa font-normal mr-[30px] text-darkGray tracking-[1px]">
          {data.modifiedDate.substring(0, 10)}
        </div>
        <div className="font-spoqa font-medium mr-[58px]">modDate</div>
        <div className="font-spoqa font-normal text-darkGray tracking-[1px]">
          {data.modifiedDate.substring(0, 10)}
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="mt-5 mb-[14px]">As-Is</div>
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
              className="w-[30px] h-[30px] bg-blue-200 rounded-sm mr-2"
              onClick={() => handleUpdateQa("asIs")}
            >
              V
            </button>
            <button
              className="w-[30px] h-[30px] bg-black text-white rounded-sm"
              onClickCapture={() => setMode({ ...mode, asIs: "view" })}
            >
              X
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 mb-[14px]">To-Be</div>
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
              className="w-[30px] h-[30px] bg-blue-200 rounded-sm mr-2"
              onClick={() => handleUpdateQa("toBe")}
            >
              V
            </button>
            <button
              className="w-[30px] h-[30px] bg-black text-white rounded-sm"
              onClickCapture={() => setMode({ ...mode, toBe: "view" })}
            >
              X
            </button>
          </div>
        </div>
      )}
      <div className="mt-5 mb-[14px]">Memo</div>
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
              className="w-[30px] h-[30px] bg-blue-200 rounded-sm mr-2"
              onClick={() => handleUpdateQa("memo")}
            >
              V
            </button>
            <button
              className="w-[30px] h-[30px] bg-black text-white rounded-sm"
              onClickCapture={() => setMode({ ...mode, memo: "view" })}
            >
              X
            </button>
          </div>
        </div>
      )}
      <div className="mt-5 mb-[14px]">
        FILE <span className="text-sm font-spoqa text-darkGray">(MAX:4)</span>
      </div>
      <div className="flex items-center">
        {data.file.length < 4 && (
          <QaFileUploader qaId={data.id} refetch={refetch} />
        )}
        {data.file.map((item) => (
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
      <div className="flex mt-5">
        <input
          id="content"
          onChange={handleComment}
          value={comment}
          className="px-4 w-full border border-lightGray rounded-[10px] mr-[10px]"
          onKeyDown={handleCommentEnter}
        />
        <div
          onClick={handleAddComment}
          className="w-[40px] h-[40px] bg-black text-white rounded-[10px] flex justify-center items-center"
        >
          <img src="/images/plus.png" width={24} height={24} />
        </div>
      </div>
      <div className="mt-9">
        {commentData.map((item) => (
          <QaComment
            key={item.id}
            data={item}
            commentRefetch={commentRefetch}
          />
        ))}
      </div>
    </div>
  );
};

export default QaCardView;
