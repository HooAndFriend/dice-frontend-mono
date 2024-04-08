// ** Next Imports
import Image from "next/image";

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
  mode: "list" | "kanban";
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
}: PropsType) => {
  return (
    <div className="w-full">
      <TicketSearchCard value={word} onChange={handleWord} />
      <div className="flex items-center justify-between mt-8">
        <h1 className="pl-4 font-bold text-md">Total Ticket : {ticketCount}</h1>
        <div className="w-[100px] bg-white h-[50px] rounded-[30px] border-1 border-solid border-[#EBEBEC] flex items-center justify-between">
          <div
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setMode("kanban")}
            style={{
              backgroundColor: mode === "kanban" ? "black" : "white",
            }}
          >
            <Image
              src={
                mode === "kanban"
                  ? "/svg/ticket/board-list-white.svg"
                  : "/svg/ticket/board-list-black.svg"
              }
              alt="icon"
              width={24}
              height={24}
            />
          </div>
          <div
            className="w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setMode("list")}
            style={{
              backgroundColor: mode === "list" ? "black" : "white",
            }}
          >
            <Image
              src={
                mode === "list"
                  ? "/svg/ticket/ticket-list-white.svg"
                  : "/svg/ticket/ticket-list-black.svg"
              }
              alt="icon"
              width={24}
              height={24}
            />
          </div>
        </div>
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
