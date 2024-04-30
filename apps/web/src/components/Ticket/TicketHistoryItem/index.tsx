// ** Type Imports
import { TicketHistory } from "@/src/type/ticket";

interface PropsType {
  data: TicketHistory;
}

const TicketHistoryItem = ({ data }: PropsType) => {
  return (
    <div className="flex items-center w-full mb-5">
      <div className="w-[5px] h-[5px] rounded-full bg-black" />
      {data.username} : {data.log}
    </div>
  );
};

export default TicketHistoryItem;
