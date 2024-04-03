// ** Component Imports
import TicketCard from "@/src/components/Ticket/TicketCard";
import TicketTable from "@/src/components/Ticket/TicketTable";
import TicketSearchCard from "../../components/Ticket/TicketSearchCard";

// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";

interface PropsType {
  ticketId: number;
  data: TicketInfo[];
  word: string;
  setTicketId: (id: number) => void;
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TicketContainerView = ({
  ticketId,
  data,
  word,
  setTicketId,
  handleWord,
}: PropsType) => {
  return (
    <div className="w-full">
      <TicketSearchCard value={word} onChange={handleWord} />
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">총 4건</h1>
      </div>
      <div className={`${ticketId !== 0 && "flex"}`}>
        <div style={{ width: ticketId !== 0 ? "65%" : "100%" }}>
          <TicketTable
            handleClick={setTicketId}
            data={data.filter((item) => item.name.includes(word))}
          />
        </div>
        {ticketId !== 0 && (
          <div className="w-[35%] pl-8">
            <TicketCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketContainerView;
