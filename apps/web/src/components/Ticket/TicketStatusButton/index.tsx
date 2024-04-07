"use client";

// ** React Imports
import { useState, useRef, useEffect } from "react";

// ** Type Imports
import { EpicStatus } from "@/src/type/epic";
import { CommonResponse } from "@/src/type/common";

// ** Utils Imports
import { getStateBoxColor } from "@/src/utils/color";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Put } from "@/src/repository";
import { mutate } from "swr";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  ticketId: number;
  status: EpicStatus;
  refetch?: () => void;
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

const TicketStatusButton = ({ status, ticketId, refetch }: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const { handleOpen: handleModalOpen } = useDialog();

  const handleOpen = () => {
    setOpen((c) => !c);
  };

  const handleStatus = (status: EpicStatus) => {
    updateTicketStatus.trigger(status);
  };

  const updateTicketStatus = useSWRMutation(
    "/v1/ticket/status",
    async (url: string, { arg }: { arg: EpicStatus }) =>
      await Put<CommonResponse<void>>(url, { status: arg, ticketId }),
    {
      onSuccess: () => {
        setOpen(false);
        mutate("/v1/epic");
        mutate("/v1/ticket");
        mutate(`/v1/ticket/detail/${ticketId}`);

        refetch && refetch();
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

  return (
    <div className="relative z-4">
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
      {open && (
        <div
          className="absolute w-[150px] h-[150px] bg-slate-50 top-[50px] left-0 rounded-lg overflow-y-auto z-10"
          ref={dropdownRef}
        >
          {statusList.map((item) => (
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
  );
};

export default TicketStatusButton;
