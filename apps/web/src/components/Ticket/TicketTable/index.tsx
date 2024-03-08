// ** Component Imports
import TicketAddItem from "../TicketAddItem";
import TicketHeader from "../TicketHeader";
import TicketItem from "../TicketItem";

interface PropsType {
  handleClick?: (id: number) => void;
}

const TicketTable = ({ handleClick }: PropsType) => {
  return (
    <div className="mt-6 h-[530px] overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
      <TicketHeader />
      <TicketItem handleClick={handleClick} id={1} />
      <TicketItem handleClick={handleClick} id={2} />
      <TicketItem handleClick={handleClick} id={3} />
      <TicketAddItem />
    </div>
  );
};

export default TicketTable;
