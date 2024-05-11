// ** Next Imports
import Image from "next/image";

// ** Component Imports
import TicketUserButton from "../TicketUserButton";
import TicketStatusButton from "../TicketStatusButton";
import TicketDatePicker from "../TicketDatePicker";

// ** Utils Imports
import dayjs from "dayjs";

// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";
import TicketSettingButton from "../TicketSettingButton";
import TicketEpicButton from "../TicketEpicButton";

interface PropsType {
  data: TicketInfo;
  isEpic: boolean;
  word: string;
  handleClick: (id: number) => void;
}

const TicketItem = ({ handleClick, data, isEpic, word }: PropsType) => {
  const highlightFirstMatch = (text: string, word: string) => {
    const index = text.toLowerCase().indexOf(word.toLowerCase());
    if (index === -1) return text;
    const before = text.slice(0, index);
    const match = text.slice(index, index + word.length);
    const after = text.slice(index + word.length);
    return (
      <>
        {before}
        <mark>{match}</mark>
        {after}
      </>
    );
  };

  return (
    <div
      className="flex h-[80px] py-[24px] hover:bg-slate-400 rounded-lg"
      onClick={() => handleClick(data.id)}
    >
      <div className="flex w-[10%] items-center pl-[48px]">
        <TicketSettingButton data={data} isText={false} />
      </div>
      <div className="flex w-[40%] items-center">
        <h1
          className={`text-[16px] mr-4 ${
            data.status === "DONE" && "line-through"
          } ${data.status === "REOPEN" && "text-red-300"}`}
        >
          {data.code}
        </h1>
        <h1
          className={`text-[16px] ${data.status === "DONE" && "line-through"} ${
            data.status === "REOPEN" && "text-red-300"
          }`}
        >
          {highlightFirstMatch(data.name, word)}
        </h1>
      </div>
      {!isEpic && (
        <div className="flex w-[10%] items-center justify-center">
          <TicketEpicButton data={data} />
        </div>
      )}
      <div className="flex w-[10%] items-center justify-center">
        <TicketUserButton
          profile={data.worker?.profile}
          nickname={data.worker?.nickname}
          userId={data.worker?.id}
          type="user"
          ticketId={data.id}
          isNickname={false}
        />
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <p>{data.dueDate ? dayjs(data.dueDate).format("YYYY-MM-DD") : "-"}</p>
      </div>
      <div className="flex items-center">
        <TicketStatusButton ticketId={data.id} status={data.status} />
      </div>
    </div>
  );
};

export default TicketItem;
