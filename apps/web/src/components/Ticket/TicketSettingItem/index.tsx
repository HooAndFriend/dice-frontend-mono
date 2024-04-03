// ** Component Imports
import {SettingListInfo} from "@/src/type/ticket";

// ** Component Imports
import CustomInput from "../../Input/CustomInput";
import useInput from "@/src/hooks/useInput";

import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import Image from "next/image";

interface PropsType {
  item: SettingListInfo;
  onUpdate: (updatedItem: SettingListInfo) => void;
  handleTicketDelete: (id: number) => void;
}

const TicketSettingItem = forwardRef(
  ({item, onUpdate, handleTicketDelete}: PropsType, ref) => {
    const {data, handleInput, setData} = useInput({
      id: item.id,
      color: item.color,
      type: item.type,
      description: item.description,
      admin: {
        id: item.admin.id,
      },
      workspace: {
        id: item.workspace.id,
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
            <input
              name="color"
              value={data.color}
              onChange={handleInput}
              type="color"
              className="appearance-none border-none bg-transparent w-[40px] h-[40px] rounded-lg"
            />
          </div>
          <div className="px-8">
            <CustomInput
              name="type"
              value={data.type}
              onChange={handleInput}
              width="150px"
              height="50px"
              borderRadius="10px"
            />
          </div>
          <div>
            <CustomInput
              name="description"
              value={data.description}
              onChange={handleInput}
              width="1000px"
              height="50px"
              borderRadius="10px"
            />
          </div>
        </div>
        <div onClick={() => handleTicketDelete(item.id)} className="ml-4">
          <Image
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
