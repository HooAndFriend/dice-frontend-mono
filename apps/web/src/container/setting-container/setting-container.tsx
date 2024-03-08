import TicketSettingItem from "@/src/components/Ticket/TicketSettingItem";
import TicketTypeAddItem from "@/src/components/Ticket/TicketTypeAddItem";

interface PropsType {}

const SettingContainerView = ({}: PropsType) => {
  return (
    <div>
      <div className="mt-6 overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
        <TicketSettingItem />
        <hr className="my-[25px]" />
        <TicketTypeAddItem />
      </div>
      <div className="flex justify-end mt-[40px]">
        <button className="w-[275px] h-[55px] text-[#623AD6] border-[#623AD6] rounded-[15px] bg-white border-solid border-[2px]">
          RESET
        </button>
        <button className="w-[275px] h-[55px] bg-[#623AD6] text-white rounded-[15px] ml-4">
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default SettingContainerView;
