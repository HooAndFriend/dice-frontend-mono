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

// ** Recoil Imports
import { AuthState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

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

  const { uuid } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

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
      await Put<CommonResponse<void>>(
        url,
        { status: arg, qaId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "workspace-code": uuid,
          },
        }
      ),
    {
      onSuccess: () => {
        setOpen(false);
        mutate("/v1/qa");
        refetch();
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
          className="absolute w-[150px] h-[150px] bg-slate-50 top-[50px] left-0 rounded-lg overflow-y-auto z-10"
          ref={dropdownRef}
        >
          {statusList
            .filter((item) => item !== status)
            .map((item) => (
              <div
                className="w-full h-[30px] py-2 px-4 hover:bg-slate-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatus(item);
                }}
                key={item}
              >
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
