// ** Component Imports
import { SettingListInfo } from "@/src/type/ticket";

// ** Component Imports
import CustomInput from "../../Input/CustomInput";
import useInput from "@/src/hooks/useInput";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Image from "next/image";
import CustomImage from "../../Image/CustomImage";
import { getTicketSettingImage } from "@/src/utils/ticket-setting";

interface PropsType {
  item: SettingListInfo;
  onUpdate: (updatedItem: SettingListInfo) => void;
  handleTicketDelete: (id: number) => void;
}

const TicketSettingItem = forwardRef(
  ({ item, onUpdate, handleTicketDelete }: PropsType, ref) => {
    const { data, handleInput, setData } = useInput<SettingListInfo>({
      id: item.id,
      name: item.name,
      type: item.type,
      description: item.description,
      admin: {
        id: item.admin?.id,
      },
      workspace: {
        id: item.workspace?.id,
      },
    });

    const handleReset = () => {
      setData(item);
    };

    useImperativeHandle(ref, () => ({
      handleReset: handleReset,
    }));

    useEffect(() => {
      onUpdate(data);
    }, [data, item]);

    return (
      <div className="flex items-center justify-between">
        <div className="flex h-[60px] items-center">
          <div className="flex items-center justify-center">
            <div
              className="w-[40px] h-[40px] rounded-[6px] flex items-center justify-center"
              style={{
                backgroundColor: getTicketSettingImage(data.type).color,
              }}
            >
              <CustomImage
                src={getTicketSettingImage(data.type).url}
                alt="ticket_setting"
                width={25}
                height={25}
              />
            </div>
          </div>
          <div className="px-8">
            <CustomInput
              name="type"
              value={data.type}
              onChange={handleInput}
              width="165px"
              height="50px"
              borderRadius="10px"
            />
          </div>
          <div>
            <CustomInput
              name="description"
              value={data.description}
              onChange={handleInput}
              width="600px"
              height="50px"
              borderRadius="10px"
            />
          </div>
        </div>
        <div onClick={() => handleTicketDelete(item.id)} className="ml-4">
          <CustomImage
            src={"/svg/boldX.svg"}
            alt="black-box"
            width={36}
            height={36}
          />
        </div>
      </div>
    );
  }
);

export default TicketSettingItem;
