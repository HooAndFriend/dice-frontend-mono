// ** Next Imports
import Image from "next/image";
import TicketTable from "@/src/components/Ticket/TicketTable";

interface PropsType {
  open: boolean;
  handleOpen: () => void;
}
const EpicItemView = ({ open, handleOpen }: PropsType) => {
  return (
    <div>
      <div className="w-full h-[75px] flex items-center">
        <div className="w-[24px] h-[24px] bg-green-300 rounded-lg"></div>
        <h1 className="ml-8">DICE-2 로그인</h1>
        <div className="ml-8 w-[370px] bg-gray-200 rounded-full h-[24px] dark:bg-gray-700 flex items-center">
          <div className="bg-blue-600 h-[24px] rounded-lg w-[45%]"></div>
        </div>
        <h1 className="ml-2">DICE-2 로그인</h1>
        <h4 className="ml-2">(30/60)</h4>
        <div className="ml-auto">
          <Image
            src={open ? "/svg/arrow-up.svg" : "/svg/arrow-down.svg"}
            alt="arrow"
            width={24}
            height={24}
            onClick={handleOpen}
          />
        </div>
      </div>
      {open && <TicketTable />}
      <hr className="bg-[#EBEBEC]" />
    </div>
  );
};

export default EpicItemView;
