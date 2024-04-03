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

interface PropsType {
  data: TicketInfo;
  handleClick?: (id: number) => void;
}

const TicketItem = ({ handleClick = (id: number) => {}, data }: PropsType) => {
  return (
    <div
      className="flex h-[60px] hover:bg-slate-400 rounded-lg"
      onClick={() => handleClick(data.id)}
    >
      <div className="flex w-[10%] items-center justify-center">
        <div className="w-[24px] h-[24px] bg-green-300 rounded-lg"></div>
      </div>
      <div className="flex w-[40%] items-center">
        <h1>{`${data.code} ${data.name}`}</h1>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <TicketStatusButton ticketId={data.id} status={data.status} />
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <TicketUserButton
          profile={data.worker?.profile}
          type="user"
          ticketId={data.id}
        />
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <TicketDatePicker
          ticketId={data.id}
          value={dayjs(data.dueDate).format("YYYY-MM-DD")}
        />
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <h1>
          {data.completeDate
            ? dayjs(data.completeDate).format("YYYY-MM-DD")
            : "-"}
        </h1>
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <h1>
          {data.reopenDate ? dayjs(data.reopenDate).format("YYYY-MM-DD") : "-"}
        </h1>
      </div>
    </div>
  );
};

export default TicketItem;
