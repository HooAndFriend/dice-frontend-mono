// ** Component Imports
import EpicTable from "@/src/components/Epic/EpicTable";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

// ** Type Imports
import { EpicInfo } from "@/src/type/epic";
import EpicSearchCard from "../../components/Epic/EpicSearchCard";
import TicketCard from "@/src/components/Ticket/TicketCard";

interface PropsType {
  word: string;
  epicData: EpicInfo[];
  epicCount: number;
  ticketId: number;
  setTicketId: (id: number) => void;
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const EpicContainerView = ({
  epicData,
  epicCount,
  word,
  ticketId,
  setTicketId,
  handleWord,
  onDragEnd,
}: PropsType) => {
  return (
    <div className="w-full">
      <EpicSearchCard value={word} onChange={handleWord} />
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">Total Epic : {epicCount}</h1>
      </div>
      <div className={`${ticketId !== 0 && "flex"}`}>
        <div style={{ width: ticketId !== 0 ? "65%" : "100%" }}>
          <EpicTable
            word={word}
            handleClick={setTicketId}
            epicData={epicData.filter((item) => item.name.includes(word))}
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

export default EpicContainerView;
