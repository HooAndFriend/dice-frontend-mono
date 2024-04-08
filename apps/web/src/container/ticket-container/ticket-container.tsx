// ** Component Imports
import TicketCard from "@/src/components/Ticket/TicketCard";
import TicketTable from "@/src/components/Ticket/TicketTable";
import TicketSearchCard from "../../components/Ticket/TicketSearchCard";

// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

interface PropsType {
  ticketId: number;
  data: TicketInfo[];
  word: string;
  ticketCount: number;
  setTicketId: (id: number) => void;
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const TicketContainerView = ({
  ticketId,
  data,
  word,
  ticketCount,
  setTicketId,
  handleWord,
  onDragEnd,
}: PropsType) => {
  return (
    <div className="w-full">
      <TicketSearchCard value={word} onChange={handleWord} />
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">Total Ticket : {ticketCount}</h1>
      </div>
      <div className={`${ticketId !== 0 && "flex"}`}>
        <div style={{ width: ticketId !== 0 ? "65%" : "100%" }}>
          <TicketTable
            handleClick={setTicketId}
            data={data.filter((item) => item.name.includes(word))}
            onDragEnd={onDragEnd}
          />
        </div>
        {ticketId !== 0 && (
          <div className="w-[35%] pl-8">
            <TicketCard
              ticketId={ticketId}
              handleClose={() => setTicketId(0)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketContainerView;
