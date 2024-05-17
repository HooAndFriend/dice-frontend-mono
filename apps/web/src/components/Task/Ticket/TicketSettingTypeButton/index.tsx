// ** React Imports
import { useState, useEffect, useRef } from "react";

// ** Type Imports
import { TicketSettingType } from "@/src/type/ticket";

// ** Utils Imports
import { getTicketSettingImage } from "@/src/utils/ticket-setting";

// ** Component Imports
import CustomImage from "../../../Image/CustomImage";

const SettingType: TicketSettingType[] = [
  "RED",
  "BLUE",
  "GREEN",
  "YELLOW",
  "PURPLE",
  "BLACK",
  "PINK",
  // "OTHER",
];

interface PropsType {
  type: TicketSettingType;
  setType: (type: TicketSettingType) => void;
}

const TicketSettingTypeButton = ({ type, setType }: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((c) => !c);
  };

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
    <div className="relative z-10">
      <div
        className="flex items-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <div
          className="w-[40px] h-[40px] rounded-[6px] flex items-center justify-center"
          style={{
            backgroundColor: getTicketSettingImage(type).color,
          }}
        >
          <CustomImage
            src={getTicketSettingImage(type).url}
            alt="ticket_setting"
            width={25}
            height={25}
          />
        </div>
      </div>
      {open && (
        <div
          className="absolute p-[12px] bg-white shadow-md w-[246px] h-[89px] top-[40px] left-0 rounded-[10px] overflow-y-auto z-10 overflow-x-hidden"
          ref={dropdownRef}
        >
          <h1>기본 아이콘</h1>
          <div className="flex justify-between mt-[9px]">
            {SettingType.map((item) => (
              <div
                className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center cursor-pointer"
                style={{
                  border: item === type ? "black 1px solid" : "",
                  backgroundColor: getTicketSettingImage(item).color,
                }}
                onClick={() => {
                  setType(item);
                  handleOpen();
                }}
              >
                <CustomImage
                  src={getTicketSettingImage(item).url}
                  alt="ticket_setting"
                  width={15}
                  height={15}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSettingTypeButton;
