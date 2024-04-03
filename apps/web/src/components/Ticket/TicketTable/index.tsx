// ** Component Imports
import TicketAddItem from "../TicketAddItem";
import TicketHeader from "../TicketHeader";
import TicketItem from "../TicketItem";

// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";

interface PropsType {
  data: TicketInfo[];
  handleClick?: (id: number) => void;
}

const TicketTable = ({ handleClick, data }: PropsType) => {
  return (
    <div className="mt-6 h-[530px] overflow-auto w-full bg-white rounded-[20px] shadow-md p-4">
      <TicketHeader />
      {data.map((item) => (
        <TicketItem handleClick={handleClick} data={item} key={item.id} />
      ))}
      <TicketAddItem />
    </div>
  );
};

export default TicketTable;
