"use client";
// ** Next Imports
import Image from "next/image";

// ** React Imports
import { useMemo, useState } from "react";

// ** Component Imports

// ** Type Imports
import { EpicInfo } from "@/src/type/epic";
import TicketItem from "@/src/components/Ticket/TicketItem";
import TicketHeader from "@/src/components/Ticket/TicketHeader";
import TicketAddItem from "@/src/components/Ticket/TicketAddItem";

interface PropsType {
  item: EpicInfo;
}

const EpicItem = ({ item }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  const epicProgress = useMemo(() => {
    if (item.doneTicketCount === 0) {
      if (item.ticket.length === 0) return "0%";
      return "0%";
    }

    return `${(item.doneTicketCount / item.ticket.length) * 100}%`;
  }, [item]);

  return (
    <div>
      <div className="w-full h-[75px] flex items-center">
        <div className="w-[24px] h-[24px] bg-green-300 rounded-lg"></div>
        <h1 className="ml-8 w-[300px]">{item.code + " " + item.name}</h1>
        <div className="ml-8 w-[370px] bg-gray-200 rounded-full h-[24px] dark:bg-gray-700 flex items-center">
          <div
            className={`bg-blue-600 h-[24px] rounded-lg`}
            style={{
              width: epicProgress,
            }}
          />
        </div>
        <h4 className="ml-2">
          ({item.doneTicketCount}/{item.ticket.length})
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
      {open && (
        <div>
          <TicketHeader />
          {item.ticket.map((item) => (
            <TicketItem handleClick={() => {}} data={item} key={item.id} />
          ))}
          <TicketAddItem epicId={item.id} />
        </div>
      )}

      <hr className="bg-[#EBEBEC]" />
    </div>
  );
};

export default EpicItem;
