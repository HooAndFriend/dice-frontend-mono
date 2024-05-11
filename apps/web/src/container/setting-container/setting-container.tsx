// ** Component Imports
import CustomImage from "@/src/components/Image/CustomImage";
import TicketSettingItem from "@/src/components/Ticket/TicketSettingItem";

// ** Service Imports

// ** Type Imports
import { SettingListInfo } from "@/src/type/ticket";

import { useRef, useState } from "react";

interface PropsType {
  data: SettingListInfo[];
  handleTicketSetting: (data: SettingListInfo) => void;
  handleTicketDelete: (id: number) => void;
}

const SettingContainerView = ({
  data,
  handleTicketSetting,
  handleTicketDelete,
}: PropsType) => {
  const [settingItems, setSettingItems] = useState<SettingListInfo[]>(data);
  const ref = useRef([]);

  const onUpdate = (index: number, updatedItem: SettingListInfo) => {
    const newItems = [...settingItems];
    newItems[index] = updatedItem;
    setSettingItems(newItems);
  };

  const handleUpdate = () => {
    settingItems.forEach((item) => handleTicketSetting(item));
  };

  const handleReset = () => {
    data.forEach((item, index) => {
      ref.current[index].handleReset(item);
    });
  };

  return (
    <div>
      <div className="mt-6 overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
        {data.map((item, index) => (
          <>
            <TicketSettingItem
              key={item.id}
              item={item}
              onUpdate={(updatedItem) => {
                onUpdate(index, updatedItem);
              }}
              handleTicketDelete={handleTicketDelete}
              ref={(element) => (ref.current[index] = element)}
            />
            <hr className="my-[25px]" />
          </>
        ))}
        <div className="w-full h-[75px] flex items-center">
          <div className="flex items-center w-full h-full">
            <CustomImage
              src="/svg/add-box.svg"
              width={36}
              height={36}
              alt="add-box"
            />
            <h1 className="text-[#DDDDDD] text-[16px] font-bold ml-4">
              Add Type
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-[40px]">
        <button
          onClick={handleReset}
          className="w-[275px] h-[55px] text-[#623AD6] border-[#623AD6] rounded-[15px] bg-white border-solid border-[2px]"
        >
          RESET
        </button>
        <button
          onClick={handleUpdate}
          className="w-[275px] h-[55px] bg-[#623AD6] text-white rounded-[15px] ml-4"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default SettingContainerView;
