// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";

interface PropsType {
  data: TicketInfo;
}

const TicketEpicButton = ({ data }: PropsType) => {
  return (
    <button className="w-[84px] h-[30px] rounded-[6px] bg-[#623AD6] flex justify-center text-[12px] items-center text-white font-spoqa">
      {data.epic ? data.epic.name : "Add Epic"}
    </button>
  );
};

export default TicketEpicButton;
