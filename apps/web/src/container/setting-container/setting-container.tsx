// ** Component Imports
import TicketSettingItem from "@/src/components/Ticket/TicketSettingItem";
import TicketTypeAddItem from "@/src/components/Ticket/TicketTypeAddItem";

// ** Service Imports

// ** Type Imports
import {SettingListInfo} from "@/src/type/ticket";

import {useState} from "react";

interface PropsType {
  data: SettingListInfo[];
  handleTicketSetting: (
    settingId: number,
    color: string,
    type: string,
    description: string
  ) => void;
  handleTicketDelete: (id: number) => void;
}

const SettingContainerView = ({
  data,
  handleTicketSetting,
  handleTicketDelete,
}: PropsType) => {
  const [settingItems, setSettingItems] = useState<SettingListInfo[]>(data);

  const handleUpdate = (index: number, updatedItem: SettingListInfo) => {
    const newItems = [...settingItems];
    newItems[index] = updatedItem;
    setSettingItems(newItems);
  };

  const handleReset = () => {
    console.log("Reset");
  };

  return (
    <div>
      <div className="mt-6 overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
        {data
          ? data.map((item, index) => (
              <>
                <TicketSettingItem
                  key={item.id}
                  item={item}
                  onUpdate={updatedItem => {
                    handleUpdate(index, updatedItem);
                  }}
                  handleTicketDelete={handleTicketDelete}
                />
                <hr className="my-[25px]" />
              </>
            ))
          : null}

        <TicketTypeAddItem />
      </div>
      <div className="flex justify-end mt-[40px]">
        <button
          onClick={handleReset}
          className="w-[275px] h-[55px] text-[#623AD6] border-[#623AD6] rounded-[15px] bg-white border-solid border-[2px]"
        >
          RESET
        </button>
        <button
          onClick={() => {
            settingItems.forEach((item, index) =>
              handleTicketSetting(
                item.id,
                item.color,
                item.type,
                item.description
              )
            );
          }}
          className="w-[275px] h-[55px] bg-[#623AD6] text-white rounded-[15px] ml-4"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default SettingContainerView;
