"use client";

// ** React Imports
import { useState } from "react";

// ** Type Imports
import { EpicStatus } from "@/src/type/epic";

// ** Utils Imports
import { getStateBoxColor } from "@/src/utils/color";

interface PropsType {
  status: EpicStatus;
}

const statusList: EpicStatus[] = [
  "WAITING",
  "DOING",
  "DONE",
  "COMPLETE",
  "HOLD",
  "REOPEN",
  "NOTHING",
];

const QaStatusButton = ({ status }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  return (
    <div className="relative z-4">
      <button
        className="w-[120px] h-[45px] rounded-[30px] flex justify-center items-center text-white font-spoqa font-bold"
        style={{ backgroundColor: getStateBoxColor(status) }}
        onClick={handleOpen}
      >
        {status}
      </button>
      {open && (
        <div className="absolute w-[150px] h-[150px] bg-slate-50 top-[50px] left-0 rounded-lg overflow-y-auto z-10">
          {statusList
            .filter((item) => item !== status)
            .map((item) => (
              <div className="w-full h-[30px] py-2 px-4 hover:bg-slate-200">
                <button
                  className={`p-2 h-[100%] rounded-[30px] flex justify-center items-center text-white font-spoqa font-bold text-[10px]`}
                  style={{ backgroundColor: getStateBoxColor(item) }}
                >
                  {item}
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default QaStatusButton;
