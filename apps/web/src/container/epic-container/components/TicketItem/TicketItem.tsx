// ** Next Imports
import Image from "next/image";
import TicketToggleItem from "./components/TicketToggleItem";

interface PropsType {
  open: boolean;
  handleOpen: () => void;
}
const TicketItemView = ({ open, handleOpen }: PropsType) => {
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
      {open && (
        <div>
          <div className="h-[44px] w-full bg-[#F4F4FA] rounded-[10px] flex">
            <div className="flex w-[10%] items-center justify-center">
              <h1>Code</h1>
            </div>
            <div className="flex w-[40%] items-center justify-center">
              <h1>Name</h1>
            </div>
            <div className="flex w-[10%] items-center justify-center">
              <h1>Status</h1>
            </div>
            <div className="flex w-[10%] items-center justify-center">
              <h1>Work</h1>
            </div>
            <div className="flex w-[20%] items-center justify-center">
              <h1>DueDate</h1>
            </div>
            <div className="flex w-[20%] items-center justify-center">
              <h1>EndDate</h1>
            </div>
            <div className="flex w-[20%] items-center justify-center">
              <h1>ReopenDate</h1>
            </div>
          </div>
          <TicketToggleItem />
          <TicketToggleItem />
          <TicketToggleItem />
        </div>
      )}
      <hr className="bg-[#EBEBEC]" />
    </div>
  );
};

export default TicketItemView;
