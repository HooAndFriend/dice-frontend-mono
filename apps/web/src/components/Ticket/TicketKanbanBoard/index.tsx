// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";
import { EpicStatus } from "@/src/type/epic";

// ** Component Imports
import TicketKanbanItem from "../TicketKanbanItem";

interface PropsType {
  data: TicketInfo[];
  handleClick?: (id: number) => void;
}

const StatusList: EpicStatus[] = [
  "WAITING",
  "DOING",
  "DONE",
  "COMPLETE",
  "REOPEN",
  "HOLD",
  "NOTHING",
];

const TicketKanbanBoard = ({ data, handleClick }: PropsType) => {
  return (
    <div className="h-[530px] overflow-scroll mt-6 p-4 flex w-full">
      {StatusList.map((item) => (
        <div>
          <TicketKanbanItem
            data={data.filter((_) => _.status === item)}
            handleClick={handleClick}
            status={item}
            key={item}
          />
        </div>
      ))}
    </div>
  );
};

export default TicketKanbanBoard;
