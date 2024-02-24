import TicketItem from "../ticket-item";
import EpicAddItem from "../EpicAddItem";

const TicketTableView = () => {
  return (
    <div className="mt-6 h-[530px] overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
      <TicketItem />
      <TicketItem />
      <TicketItem />
      <TicketItem />
      <TicketItem />
      <EpicAddItem />
    </div>
  );
};

export default TicketTableView;
