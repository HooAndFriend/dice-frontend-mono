// ** Next Imports
import Image from "next/image";

interface PropsType {
  mode: "kanban" | "list";
  setMode: (mode: "kanban" | "list") => void;
}

const TicketViewToggleButton = ({ mode, setMode }: PropsType) => {
  return (
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
  );
};

export default TicketViewToggleButton;
