// ** React Imports
import { useState, useEffect, useRef } from "react";

// ** Type Imports
import { Get, Patch } from "@/src/repository";
import { CommonResponse } from "@/src/type/common";
import { GetTicketSettingListResponse, TicketInfo } from "@/src/type/ticket";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import useSWR, { mutate } from "swr";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Component Imports
import Tooltip from "../../Tooltip";

interface PropsType {
  data: TicketInfo;
  isText: boolean;
}

const TicketSettingButton = ({ data, isText }: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const { handleOpen: handleModalOpen } = useDialog();

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

  const updateTicketSetting = useSWRMutation(
    "/v1/ticket/ticket-setting",
    async (url: string, { arg }: { arg: number }) =>
      await Patch<CommonResponse<void>>(url, {
        ticketId: data.id,
        settingId: arg,
      }),
    {
      onSuccess: () => {
        setOpen(false);
        mutate("/v1/epic");
        mutate("/v1/ticket");
        mutate(`/v1/ticket/detail/${data.id}`);
      },
      onError: (error) => {
        handleModalOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
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

  if (isLoading) return;

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
        <Tooltip text={data.ticketSetting ? data.ticketSetting.type : ""}>
          {data.ticketSetting ? (
            <div
              className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center"
              style={{
                backgroundColor: data.ticketSetting.color,
                color: data.ticketSetting.textColor,
              }}
            >
              {data.ticketSetting.type.slice(0, 1)}
            </div>
          ) : (
            <div className="w-[24px] h-[24px] bg-green-300 rounded-lg" />
          )}
        </Tooltip>
        {isText && (
          <h3 className="text-[16px] ml-4">
            {data.ticketSetting ? data.ticketSetting.type : "-"}
          </h3>
        )}
      </div>
      {open && (
        <div
          className="absolute p-[8px] bg-slate-50 w-[184px] h-[184px] top-[40px] left-0 rounded-[10px] overflow-y-auto z-10 overflow-x-hidden"
          ref={dropdownRef}
        >
          {settingData.data.data.map((item) => (
            <div
              className="w-[168px] h-[32px] hover:bg-[#F4F4FA] rounded-[8px] p-[8px] flex items-center cursor-pointer"
              onClick={() => updateTicketSetting.trigger(item.id)}
            >
              <div
                className="w-[20px] h-[20px] rounded-[6px] flex items-center justify-center text-[12px]"
                style={{ backgroundColor: item.color, color: item.textColor }}
              >
                {data.ticketSetting.type.slice(0, 1)}
              </div>
              <h3 className="text-[14px] ml-[12px]">{item.type}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketSettingButton;
