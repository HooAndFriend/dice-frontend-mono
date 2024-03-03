import {CreateIssueParams} from "@/src/type/qa";
import {ChangeEvent} from "react";

interface PropsType {
  createIssue: CreateIssueParams;
  name: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
  setFile: (e) => void;
}

const CreateIssueView = ({
  createIssue,
  name,
  handleInput,
  handleAdd,
  setFile,
}: PropsType) => {
  let today = new Date();

  return (
    <>
      <input
        className="h-[50px] w-full p-4 placeholder-[#EBEBEC] border border-[#EBEBEC] rounded-[10px]"
        placeholder="Enter Title"
        id="title"
        name="title"
        value={createIssue.title}
        onChange={handleInput}
      />
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="h-5 mt-5 flex">
        <div className="font-spoqa mr-[79px] font-medium">Admin</div>
        <div className="flex mr-[45px]">
          <img
            className="rounded-full border border-[#EBEBEC] mr-[10px]"
            src="/images/dice.png"
            width={20}
            height={20}
          />
          <div className="flex items-center font-normal">{name}</div>
        </div>
        <div className="font-spoqa mr-[80px]  font-medium">Worker</div>
        <div className="flex">
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
          {today.getFullYear() +
            "-" +
            ("0" + (today.getMonth() + 1)).slice(-2) +
            "-" +
            today.getDate()}
        </div>
        <div className="font-spoqa font-medium mr-[58px]">modDate</div>
        <div className="font-spoqa font-normal text-darkGray tracking-[1px]">
          {today.getFullYear() +
            "-" +
            ("0" + (today.getMonth() + 1)).slice(-2) +
            "-" +
            today.getDate()}
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="mt-5 mb-[14px]">As-Is</div>
      <input
        id="asIs"
        name="asIs"
        value={createIssue.asIs}
        onChange={handleInput}
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
      />
      <div className="mt-5 mb-[14px]">To-Be</div>
      <input
        id="toBe"
        name="toBe"
        value={createIssue.toBe}
        onChange={handleInput}
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
      />
      <div className="mt-5 mb-[14px]">Memo</div>
      <input
        id="memo"
        name="memo"
        value={createIssue.memo}
        onChange={handleInput}
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
      />
      <div className="mt-5 mb-[14px]">
        FILE <span className="font-spoqa text-darkGray text-sm">(MAX:4)</span>
      </div>
      <label>
        <input
          type="file"
          onChange={event => {
            setFile(event.target.files[0]);
          }}
          hidden
        />
        <div className="w-[40px] h-[40px] rounded-[6px] bg-[#D9E0FF]"></div>
      </label>
      <div className="w-full flex justify-center">
        <button
          onClick={handleAdd}
          className="bg-main text-white font-spoqa font-bold w-[275px] h-[55px] rounded-[15px] mt-[40px]"
        >
          ADD
        </button>
      </div>
    </>
  );
};

export default CreateIssueView;
