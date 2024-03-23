// ** React Imports
import { ChangeEvent, KeyboardEvent } from "react";

// ** Component Imports
import CustomSelect from "@/src/components/Input/CustomSelect";
import IssueComment from "../QaComment";

// ** Type Imports
import { CommentInfo, IssueInfo } from "@/src/type/qa";
import { RoleType } from "@/src/type/common";
import QaStatusButton from "../QaStatusButton";
import QaUserButton from "../QaUserButton";

interface PropsType {
  data: IssueInfo;
  commentData: CommentInfo[];
  comment: string;
  role: RoleType;
  mode: "view" | "edit";
  deleteQa: () => void;
  updateQa: () => void;
  handleComment: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
  handleEdit: () => void;
  handleEditClose: () => void;
  handleClose: () => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCommentEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
  refetch: () => void;
}

const QaCardView = ({
  data,
  commentData,
  comment,
  role,
  mode,
  handleComment,
  handleAdd,
  deleteQa,
  handleClose,
  handleEdit,
  handleEditClose,
  handleInput,
  updateQa,
  handleCommentEnter,
  refetch,
}: PropsType) => {
  return (
    <div>
      <div className="h-[40px] flex items-center justify-between">
        <div className="text-lg font-medium font-spoqa">{data.number}</div>
        <div className="flex font-bold font-spoqa">
          {role !== "VIEWER" && mode === "view" && (
            <div className="flex">
              <button
                className="w-[110px] h-[40px] rounded-[30px] border border-lightGray flex justify-center items-center mr-[10px]"
                onClick={handleEdit}
              >
                <img
                  className="mr-[5px]"
                  src="/svg/note_edit.svg"
                  width={24}
                  height={24}
                />
                <div>Edit</div>
              </button>
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
      {mode === "view" ? (
        <div className="h-[50px] flex justify-between mt-[30px] font-spoqa">
          <div className="flex items-center text-xl font-bold">
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
          <input
            type="text"
            value={data.title}
            name="title"
            onChange={handleInput}
            className="w-full h-[40px] border border-[#EBEBEC] rounded-[10px] px-4"
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
      <input
        id="asIs"
        value={data.asIs}
        name="asIs"
        onChange={handleInput}
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px] px-4"
        disabled={mode === "view"}
      />
      <div className="mt-5 mb-[14px]">To-Be</div>
      <input
        id="toBe"
        value={data.toBe}
        name="toBe"
        onChange={handleInput}
        className="px-4 border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
        disabled={mode === "view"}
      />
      <div className="mt-5 mb-[14px]">Memo</div>
      <input
        id="memo"
        value={data.memo}
        name="memo"
        onChange={handleInput}
        className="px-4 border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
        disabled={mode === "view"}
      />
      <div className="mt-5 mb-[14px]">
        FILE <span className="text-sm font-spoqa text-darkGray">(MAX:4)</span>
      </div>
      {/* {data.file ? (
        data.file.map((item) => {
          <img
            src={item.url}
            className="w-[40px] h-[40px] rounded-[6px] bg-[#D9E0FF]"
          />;
        })
      ) : (
        <div className="w-[40px] h-[40px] rounded-[6px] bg-[#D9E0FF]"></div>
      )} */}
      {data.file.length > 0 && data.file[0]?.url != "" ? (
        <img
          className="w-[40px] h-[40px] rounded-[6px]"
          src={data.file[0].url}
        />
      ) : null}
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]" />
      {mode === "view" ? (
        <>
          <div className="flex mt-5">
            <input
              id="content"
              onChange={handleComment}
              value={comment}
              className="px-4 w-full border border-lightGray rounded-[10px] mr-[10px]"
              onKeyDown={handleCommentEnter}
            />
            <div
              onClick={handleAdd}
              className="w-[40px] h-[40px] bg-black text-white rounded-[10px] flex justify-center items-center"
            >
              <img src="/images/plus.png" width={24} height={24} />
            </div>
          </div>
          <div className="mt-9">
            {commentData.map((item) => (
              <IssueComment key={item.id} data={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-end mt-4">
          <button className="mr-4 w-[110px] h-[40px] rounded-[30px] bg-black text-white flex justify-center items-center cursor-pointer">
            <div className="flex items-center" onClick={updateQa}>
              Save
            </div>
          </button>
          <button
            className="w-[110px] h-[40px] rounded-[30px] bg-black text-white flex justify-center items-center cursor-pointer"
            onClick={handleEditClose}
          >
            <div className="flex items-center">Cancel</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default QaCardView;
