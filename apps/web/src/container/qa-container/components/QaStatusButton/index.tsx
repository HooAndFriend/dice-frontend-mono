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
  qaId: number;
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

const QaStatusButton = ({ status, qaId, refetch }: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  const { handleOpen: handleModalOpen } = useDialog();

  const handleOpen = () => {
    setOpen((c) => !c);
  };

  const handleStatus = (status: EpicStatus) => {
    updateQaStatus.trigger(status);
  };

  const updateQaStatus = useSWRMutation(
    "/v1/qa/status",
    async (url: string, { arg }: { arg: EpicStatus }) =>
      await Put<CommonResponse<void>>(url, { status: arg, qaId }),
    {
      onSuccess: () => {
        setOpen(false);
        mutate("/v1/qa");
        mutate(`/v1/qa/${qaId}`);
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
        className="w-[120px] h-[45px] rounded-[30px] flex justify-center items-center text-white font-spoqa font-bold"
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
          className="absolute w-[184px] h-[230px] top-[50px] right-0 bg-white shadow-lg rounded-lg overflow-y-auto z-30"
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

export default QaStatusButton;
