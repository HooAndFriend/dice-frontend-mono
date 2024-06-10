// ** Recoil Imports
import { WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Component Imports
import TicketAddItem from "../TicketAddItem";
import TicketItem from "../TicketItem";
import TicketHeader from "../TicketHeader";

// ** Type Imports
import { Ticket } from "@/src/type/ticket";

interface PropsType {
  data: Ticket[];
  word: string;
  handleClick?: (id: number) => void;
}

const TicketTable = ({ word, handleClick, data }: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState);

  return (
    <div className="w-full h-full bg-white border rounded-lg scrollbar-thumb-slate-700 scrollbar-track-slate-300">
      <div className="relative w-full h-full overflow-y-scroll scrollbar-thin">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm caption-bottom">
            <TicketHeader />
            <tbody className="[&amp;_tr:last-child]:border-0">
              {data.map((item) => (
                <TicketItem
                  handleClick={handleClick}
                  word={word}
                  data={item}
                  key={item.ticketId}
                  isEpic={false}
                />
              ))}
            </tbody>
            {role !== "VIEWER" && <TicketAddItem />}
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
