// ** React Imports
import { useState, useEffect, useRef, useMemo } from "react";

// ** Type Imports
import { Get } from "@/src/repository";
import { GetTicketSettingListResponse } from "@/src/type/ticket";

// ** Service Imports
import useSWR from "swr";

// ** Component Imports
import Tooltip from "../../../Tooltip";
import CustomImage from "../../../Image/CustomImage";

// ** Utils Imports
import { getTicketSettingImage } from "@/src/utils/ticket-setting";

interface PropsType {
  selectTypeId: number;
  setSelectTypeId: (value: number) => void;
}

const TicketSelectSettingButton = ({
  selectTypeId,
  setSelectTypeId,
}: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((c) => !c);
  };

  const {
    data: settingData,
    error,
    isLoading,
  } = useSWR("/v1/ticket/setting", async (url) =>
    Get<GetTicketSettingListResponse>(url)
  );

  const type = useMemo(
    () =>
      isLoading
        ? null
        : settingData.data.data.find((item) => item.id === selectTypeId),
    [settingData, selectTypeId]
  );

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

  if (error) return;

  return (
    <div className="relative z-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <Tooltip text={type ? type.type : ""}>
          {type ? (
            <div
              className="w-[40px] h-[40px] rounded-[6px] flex items-center justify-center"
              style={{
                backgroundColor: getTicketSettingImage(type.type).color,
              }}
            >
              <CustomImage
                src={getTicketSettingImage(type.type).url}
                alt="ticket_setting"
                width={25}
                height={25}
              />
            </div>
          ) : (
            <div className="w-[24px] h-[24px] bg-green-300 rounded-lg" />
          )}
        </Tooltip>
      </div>
      {open && (
        <div
          className="absolute p-[8px] bg-[#F8FAFC] w-[184px] h-[184px] top-[40px] left-0 rounded-[10px] overflow-y-auto z-10 overflow-x-hidden"
          ref={dropdownRef}
        >
          {!isLoading &&
            settingData.data.data.map((item) => (
              <div
                className="w-[168px] h-[32px] hover:bg-[#F4F4FA] rounded-[8px] p-[8px] flex items-center cursor-pointer"
                onClick={() => {
                  setSelectTypeId(item.id);
                  handleOpen();
                }}
              >
                <div
                  className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center"
                  style={{
                    backgroundColor: getTicketSettingImage(item.type).color,
                  }}
                >
                  <CustomImage
                    src={getTicketSettingImage(item.type).url}
                    alt="ticket_setting"
                    width={16}
                    height={16}
                  />
                </div>
                <h3 className="text-[14px] ml-[12px]">{item.name}</h3>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TicketSelectSettingButton;
