// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";

// ** Component Imports
import TicketKanbanCard from "../TicketKanbanCard";

// ** Type Imports
import { EpicStatus } from "@/src/type/epic";
import TicketKanbanBoardSkeleton from "../TicketKanbanBoard/TicketKanbanBoardSkeleton";

interface PropsType {
  data: TicketInfo[];
  status: EpicStatus;
  isLoading: boolean;
  handleClick?: (id: number) => void;
}

const TicketKanbanItem = ({
  data,
  handleClick,
  status,
  isLoading,
}: PropsType) => {
  return (
    <div className="w-[280px] min-w-[280px] h-full mr-[30px]">
      <h1 className="text-[20px] font-bold">{status}</h1>
      <hr className="mt-[15px] mb-[20px]" />
      {isLoading ? (
        <TicketKanbanBoardSkeleton />
      ) : (
        data.map((item) => (
          <TicketKanbanCard
            data={item}
            handleClick={handleClick}
            key={item.id}
          />
        ))
      )}
    </div>
  );
};

export default TicketKanbanItem;
