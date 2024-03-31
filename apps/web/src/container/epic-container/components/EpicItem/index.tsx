"use client";
// ** Next Imports
import Image from "next/image";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import TicketTable from "@/src/components/Ticket/TicketTable";
import { EpicInfo } from "@/src/type/epic";

interface PropsType {
  item: EpicInfo;
}

const EpicItem = ({ item }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  return (
    <div>
      <div className="w-full h-[75px] flex items-center">
        <div className="w-[24px] h-[24px] bg-green-300 rounded-lg"></div>
        <h1 className="ml-8">{item.code + " " + item.name}</h1>
        <div className="ml-8 w-[370px] bg-gray-200 rounded-full h-[24px] dark:bg-gray-700 flex items-center">
          <div className="bg-blue-600 h-[24px] rounded-lg w-[45%]"></div>
        </div>
        <h4 className="ml-2">
          ({item.doneTicketCount}/{item.allTicketCount})
        </h4>
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

export default EpicItem;
