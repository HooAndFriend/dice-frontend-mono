"use client";

// ** React Imports
import { useState } from "react";

// ** Type Imports
import { EpicStatus } from "@/src/type/epic";
import { CommonResponse } from "@/src/type/common";

// ** Component Imports
import StatusPopover from "../../Common/Popover/StatusPopover";

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

const QaStatusButton = ({ status, qaId, refetch }: PropsType) => {
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

  return (
    <StatusPopover
      isQa
      status={status}
      open={open}
      handleStatus={handleStatus}
      handleOpen={handleOpen}
    />
  );
};

export default QaStatusButton;
