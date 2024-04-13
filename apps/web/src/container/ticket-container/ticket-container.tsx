// ** Next Imports
import Image from "next/image";

// ** Component Imports
import TicketCard from "@/src/components/Ticket/TicketCard";
import TicketTable from "@/src/components/Ticket/TicketTable";
import TicketSearchCard from "../../components/Ticket/TicketSearchCard";

// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";
import { WorkspaceUser } from "@/src/type/workspace";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";
import TicketViewToggleButton from "@/src/components/Ticket/TicketViewToggleButton";
import TicketKanbanBoard from "@/src/components/Ticket/TicketKanbanBoard";

interface PropsType {
  ticketId: number;
  data: TicketInfo[];
  word: string;
  ticketCount: number;
  mode: "list" | "kanban";
  checkedList: WorkspaceUser[];
  setCheckedList: (list: WorkspaceUser[]) => void;
  setMode: (mode: "list" | "kanban") => void;
  setTicketId: (id: number) => void;
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const TicketContainerView = ({
  ticketId,
  data,
  word,
  mode,
  ticketCount,
  setTicketId,
  handleWord,
  onDragEnd,
  setMode,
  checkedList,
  setCheckedList,
}: PropsType) => {
  return (
    <div className="w-full">
      <TicketSearchCard
        value={word}
        onChange={handleWord}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
      />
      <div className="flex items-center justify-between mt-8">
        <h1 className="pl-4 font-bold text-md">Total Ticket : {ticketCount}</h1>
        <TicketViewToggleButton mode={mode} setMode={setMode} />
      </div>
      <div className={`${ticketId !== 0 && "flex"}`}>
        <div style={{ width: ticketId !== 0 ? "65%" : "100%" }}>
          {mode === "list" ? (
            <TicketTable
              handleClick={setTicketId}
              word={word}
              data={data
                .filter((item) => item.name.includes(word))
                .filter((item) =>
                  checkedList.length === 0
                    ? true
                    : checkedList.some(
                        (_) => _.teamUser.user.id === item.worker?.id
                      )
                )}
              onDragEnd={onDragEnd}
            />
          ) : (
            <TicketKanbanBoard
              handleClick={setTicketId}
              data={data.filter((item) => item.name.includes(word))}
            />
          )}
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
