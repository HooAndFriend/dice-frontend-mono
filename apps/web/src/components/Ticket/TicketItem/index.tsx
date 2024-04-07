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
  handleClick: (id: number) => void;
}

const TicketItem = ({ handleClick, data, isEpic }: PropsType) => {
  return (
    <div
      className="flex h-[60px] hover:bg-slate-400 rounded-lg"
      onClick={() => handleClick(data.id)}
    >
      <div className="flex w-[10%] items-center justify-center">
        <TicketSettingButton data={data} isText={false} />
      </div>
      <div className="flex w-[40%] items-center">
        <h1 className="text-[16px]">{`${data.code} ${data.name}`}</h1>
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
        <TicketDatePicker
          ticketId={data.id}
          value={dayjs(data.dueDate).format("YYYY-MM-DD")}
        />
      </div>
      {/* <div className="flex w-[20%] items-center justify-center">
        <h1 className="text-[16px]">
          {data.completeDate
            ? dayjs(data.completeDate).format("YYYY-MM-DD")
            : "-"}
        </h1>
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <h1 className="text-[16px]">
          {data.reopenDate ? dayjs(data.reopenDate).format("YYYY-MM-DD") : "-"}
        </h1>
      </div> */}
      <div className="flex w-[10%] items-center justify-center">
        <TicketStatusButton ticketId={data.id} status={data.status} />
      </div>
    </div>
  );
};

export default TicketItem;
