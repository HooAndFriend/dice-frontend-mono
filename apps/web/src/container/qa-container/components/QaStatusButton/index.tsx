"use client";

// ** React Imports
import { useState } from "react";

// ** Type Imports
import { EpicStatus } from "@/src/type/epic";
import { CommonResponse } from "@/src/type/common";

// ** Utils Imports
import { getStateBoxColor } from "@/src/utils/color";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Put } from "@/src/repository";

// ** Recoil Imports
import { AuthState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import { mutate } from "swr";

interface PropsType {
  qaId: number;
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

const QaStatusButton = ({ status: defaultStatus, qaId }: PropsType) => {
  const [status, setStatus] = useState<EpicStatus>(defaultStatus);
  const [open, setOpen] = useState<boolean>(false);

  const { uuid } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen: handleModalOpen } = useDialog();

  const handleOpen = () => setOpen((c) => !c);

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
                  onClick={() => handleStatus(item)}
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
