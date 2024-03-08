// ** Component Imports
import TicketAddItem from "../TicketAddItem";
import TicketHeader from "../TicketHeader";
import TicketItem from "../TicketItem";

const TicketTable = () => {
  return (
    <div className="mt-6 h-[530px] overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
      <TicketHeader />
      <TicketItem />
      <TicketItem />
      <TicketItem />
      <TicketAddItem />
    </div>
  );
};

export default TicketTable;
