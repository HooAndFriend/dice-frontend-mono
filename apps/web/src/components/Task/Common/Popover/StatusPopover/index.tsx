// ** React Imports
import { useEffect, useRef } from "react";

// ** Type Imports
import { EpicStatus } from "@/src/type/epic";

// ** Utils Imports
import { getStateBoxColor } from "@/src/utils/color";

export const StatusList: EpicStatus[] = [
  "WAITING",
  "DOING",
  "DONE",
  "COMPLETE",
  "HOLD",
  "REOPEN",
  "NOTHING",
];

interface PropsType {
  status: EpicStatus;
  open: boolean;
  isQa: boolean;
  handleStatus: (status: EpicStatus) => void;
  handleOpen: () => void;
}

const StatusPopover = ({
  status,
  open,
  isQa,
  handleStatus,
  handleOpen,
}: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleOpen();
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <div className="relative z-4">
      {isQa ? (
        <button
          className="w-[120px] h-[45px] rounded-[30px] flex justify-center items-center text-white font-spoqa font-bold"
          style={{ backgroundColor: getStateBoxColor(status) }}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          {status}
        </button>
      ) : (
        <button
          className="w-[84px] h-[30px] rounded-[6px] flex justify-center text-[12px] items-center text-white font-spoqa"
          style={{ backgroundColor: getStateBoxColor(status) }}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          {status}
        </button>
      )}
      {open && (
        <div
          className="absolute w-[184px] h-[230px] top-[50px] right-0 bg-white shadow-lg rounded-lg overflow-y-auto z-30"
          ref={dropdownRef}
        >
          {StatusList.map((item) => (
            <div className="flex items-center justify-center px-[5px] py-[8px]">
              <div
                className="w-[168px] cursor-pointer h-[32px] py-[10px] rounded-[8px] px-[8px] flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatus(item);
                }}
                key={item}
                style={{
                  backgroundColor: status === item ? "#F4F4FA" : "white",
                }}
              >
                <div
                  className="w-[12px] h-[12px] rounded-[3px]"
                  style={{ backgroundColor: getStateBoxColor(item) }}
                />
                <p
                  className="text-[12px] ml-[13px]"
                  style={{ color: status === item ? "black" : "#ACACAC" }}
                >
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    // <div className="relative z-4">
    //   <button
    //     className="w-[120px] h-[45px] rounded-[30px] flex justify-center items-center text-white font-spoqa font-bold"
    //     style={{ backgroundColor: getStateBoxColor(status) }}
    //     onClick={(e) => {
    //       e.stopPropagation();
    //       handleOpen();
    //     }}
    //   >
    //     {status}
    //   </button>
    //   {open && (
    //     <div
    //       className="absolute w-[184px] h-[230px] top-[50px] right-0 bg-white shadow-lg rounded-lg overflow-y-auto z-30"
    //       ref={dropdownRef}
    //     >
    //       {StatusList.map((item) => (
    //         <div className="flex items-center justify-center px-[5px] py-[8px]">
    //           <div
    //             className="w-[168px] cursor-pointer h-[32px] py-[10px] rounded-[8px] px-[8px] flex items-center"
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               handleStatus(item);
    //             }}
    //             key={item}
    //             style={{
    //               backgroundColor: status === item ? "#F4F4FA" : "white",
    //             }}
    //           >
    //             <div
    //               className="w-[12px] h-[12px] rounded-[3px]"
    //               style={{ backgroundColor: getStateBoxColor(item) }}
    //             />
    //             <p
    //               className="text-[12px] ml-[13px]"
    //               style={{ color: status === item ? "black" : "#ACACAC" }}
    //             >
    //               {item}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
};

export default StatusPopover;
