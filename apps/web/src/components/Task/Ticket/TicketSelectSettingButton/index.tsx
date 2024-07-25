import React, { useState, useEffect, useRef, useMemo } from "react";
import useSWR from "swr";
import Tooltip from "../../../Tooltip";
import CustomImage from "../../../Image/CustomImage";
import { Get } from "@/src/repository";
import { GetTicketSettingListResponse } from "@/src/type/ticket";
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
    setOpen((prev) => !prev);
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
        : settingData?.data?.data.find(
            (item) => item.ticketSettingId === selectTypeId
          ),
    [settingData, selectTypeId, isLoading]
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

  useEffect(() => {
    if (selectTypeId || isLoading) return;

    setSelectTypeId(settingData?.data?.data[0]?.ticketSettingId || 0);
  }, [selectTypeId, settingData, isLoading, setSelectTypeId]);

  if (error) return null;

  return (
    <div className="relative">
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
              className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center"
              style={{
                backgroundColor: getTicketSettingImage(type.type).color,
              }}
            >
              <CustomImage
                src={getTicketSettingImage(type.type).url}
                alt="ticket_setting"
                width={16}
                height={16}
              />
            </div>
          ) : (
            <div className="w-[24px] h-[24px] bg-green-300 rounded-lg" />
          )}
        </Tooltip>
      </div>
      {open && (
        <div
          className="absolute p-[8px] bg-[#F8FAFC] w-[184px] h-[184px] top-[40px] left-0 rounded-[10px] overflow-y-auto z-50 overflow-x-hidden"
          ref={dropdownRef}
        >
          {!isLoading &&
            settingData?.data?.data.map((item) => (
              <div
                key={item.ticketSettingId}
                className="w-[168px] h-[32px] hover:bg-[#F4F4FA] rounded-[8px] p-[8px] flex items-center cursor-pointer"
                onClick={() => {
                  setSelectTypeId(item.ticketSettingId);
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
