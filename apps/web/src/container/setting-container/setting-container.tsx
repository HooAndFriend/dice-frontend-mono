// ** Component Imports
import CustomImage from "@/src/components/Image/CustomImage";
import TicketSettingAddItem from "@/src/components/Ticket/TicketSettingAddItem";
import TicketSettingItem from "@/src/components/Ticket/TicketSettingItem";

// ** Type Imports
import { SettingListInfo } from "@/src/type/ticket";

interface PropsType {
  data: SettingListInfo[];
}

const SettingContainerView = ({ data }: PropsType) => {
  return (
    <div>
      <div className="mt-6 overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
        {data.map((item) => (
          <>
            <TicketSettingItem key={item.id} item={item} />
            <hr className="my-[25px]" />
          </>
        ))}
        <div className="w-full h-[75px] flex items-center">
          <TicketSettingAddItem />
        </div>
      </div>
      <div className="flex justify-end mt-[40px]">
        <button
          // onClick={handleReset}
          className="w-[275px] h-[55px] text-[#623AD6] border-[#623AD6] rounded-[15px] bg-white border-solid border-[2px]"
        >
          RESET
        </button>
        <button
          // onClick={handleUpdate}
          className="w-[275px] h-[55px] bg-[#623AD6] text-white rounded-[15px] ml-4"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default SettingContainerView;
