import CustomSelect from "@/src/components/Input/custom-select";
import { AddCommentParams, CommentInfo, IssueInfo } from "@/src/type/qa";
import IssueComment from "../issue-comment";
import { ChangeEvent } from "react";

interface PropsType {
  data: IssueInfo;
  commentData: CommentInfo[];
  comment: AddCommentParams;
  deleteQa: () => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
  handleClose: () => void;
}

const IssueDetailView = ({
  data,
  commentData,
  comment,
  handleInput,
  handleAdd,
  deleteQa,
  handleClose,
}: PropsType) => {
  return (
    <>
      <div className="h-[40px] flex items-center justify-between">
        <div className="text-lg font-medium font-spoqa">{data.number}</div>
        <div className="flex font-bold font-spoqa">
          <div className="w-[110px] h-[40px] rounded-[30px] border border-lightGray flex justify-center items-center mr-[10px]">
            <img
              className="mr-[5px]"
              src="/svg/note_edit.svg"
              width={24}
              height={24}
            />
            <div>Edit</div>
          </div>
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
          <h1
            className="text-[24px] font-bold ml-8 cursor-pointer"
            onClick={handleClose}
          >
            X
          </h1>
        </div>
      </div>
      <div className="h-[50px] flex justify-between mt-[30px] font-spoqa">
        <div className="flex items-center text-xl font-bold">{data.title}</div>
        <CustomSelect option={data.status} />
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="flex h-5 mt-5">
        <div className="font-spoqa mr-[79px] font-medium">Admin</div>
        <div className="flex mr-[45px]">
          <img
            className="rounded-full border border-[#EBEBEC] mr-[10px]"
            src={data.admin.profile}
            width={20}
            height={20}
          />
          <div className="flex items-center font-normal">
            {data.admin.nickname}
          </div>
        </div>
        <div className="font-spoqa mr-[80px] font-medium">Worker</div>
        <div className="flex">
          {/* <img
            className="rounded-full border border-[#EBEBEC] mr-[10px]"
            src={data.admin.profile}
            width={20}
            height={20}
          />
          <div className="flex items-center font-normal">
            {data.admin.nickname}
          </div> */}
          <img
            className="rounded-full border border-[#EBEBEC] mr-[10px]"
            src="/faviconGray.png"
            width={20}
            height={20}
          />
          <div className="flex items-center font-normal">NoWorker</div>
        </div>
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
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
      />
      <div className="mt-5 mb-[14px]">To-Be</div>
      <input
        id="toBe"
        value={data.toBe}
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
      />
      <div className="mt-5 mb-[14px]">Memo</div>
      <input
        id="memo"
        value={data.memo}
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
      />
      <div className="mt-5 mb-[14px]">
        FILE <span className="text-sm font-spoqa text-darkGray">(MAX:4)</span>
      </div>
      {data.file ? (
        data.file.map((item) => {
          <img
            src={item.url}
            className="w-[40px] h-[40px] rounded-[6px] bg-[#D9E0FF]"
          />;
        })
      ) : (
        <div className="w-[40px] h-[40px] rounded-[6px] bg-[#D9E0FF]"></div>
      )}
      {data.file.length > 0 && data.file[0]?.url != "" ? (
        <img
          className="w-[40px] h-[40px] rounded-[6px]"
          src={data.file[0].url}
        />
      ) : null}

      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="flex mt-5">
        <input
          id="content"
          name="content"
          onChange={handleInput}
          value={comment.content}
          className="w-full border border-lightGray rounded-[10px] mr-[10px]"
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
          <IssueComment key={item.commentId} data={item} />
        ))}
      </div>
    </>
  );
};

export default IssueDetailView;
