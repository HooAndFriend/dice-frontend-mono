// ** Component Imports
import TicketSettingAddItem from "@/src/components/Task/Ticket/TicketSettingAddItem";
import TicketSettingItem from "@/src/components/Task/Ticket/TicketSettingItem";

// ** Type Imports
import { SettingListInfo, TicketSettingType } from "@/src/type/ticket";
import TicketSettingSkeleton from "./TicketSettingSkeleton";

interface PropsType {
  data: SettingListInfo[];
  isLoading: boolean;
  handleData: (
    id: number,
    value: string | TicketSettingType,
    type: "name" | "type" | "description"
  ) => void;
  updateTicketSetting: () => void;
  refetch: () => void;
}

const SettingContainerView = ({
  data,
  isLoading,
  handleData,
  updateTicketSetting,
  refetch,
}: PropsType) => {
  return (
    <div>
      <div className="mt-6 overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
        {isLoading ? (
          <TicketSettingSkeleton />
        ) : (
          data.map((item) => (
            <>
              <TicketSettingItem
                key={item.ticketSettingId}
                item={item}
                handleData={handleData}
              />
              <hr className="my-[25px]" />
            </>
          ))
        )}
        <div className="w-full h-[75px] flex items-center">
          <TicketSettingAddItem />
        </div>
      </div>
      <div className="flex justify-end mt-[40px]">
        <button
          onClick={refetch}
          className="w-[275px] h-[55px] text-[#623AD6] border-[#623AD6] rounded-[15px] bg-white border-solid border-[2px]"
        >
          RESET
        </button>
        <button
          onClick={updateTicketSetting}
          className="w-[275px] h-[55px] bg-[#623AD6] text-white rounded-[15px] ml-4"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default SettingContainerView;
