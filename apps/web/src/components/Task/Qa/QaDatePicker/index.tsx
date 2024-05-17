// ** Service Imports
import { mutate } from "swr";
import { Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Recoil Imports
import { AuthState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import CustomImage from "../../../Image/CustomImage";
import { useState } from "react";

interface PropsType {
  value: string;
  qaId: number;
}

const QaDatePicker = ({ value, qaId }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  const { handleOpen: handleDialogOpen } = useDialog();

  // ** QA 수정
  const updateQa = useSWRMutation(
    "v1/qa/dueDate",
    async (url: string, { arg }: { arg: string }) =>
      await Put<CommonResponse<void>>(url, { qaId, dueDate: arg }),
    {
      onSuccess: () => {
        mutate("/v1/qa");
        mutate(`/v1/qa/${qaId}`);
      },
      onError: (error) => {
        handleDialogOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQa.trigger(e.target.value);
  };

  return (
    <div>
      {open ? (
        <input
          type="date"
          value={value}
          onChange={handleOnChange}
          className="h-[40px] w-[240px] border-none bg-none"
        />
      ) : (
        <div
          className="flex items-center px-[16px] h-[40px] bg-[#F2F4F6] rounded-[5px] w-[240px] justify-between cursor-pointer"
          onDoubleClick={handleOpen}
        >
          <p>{value ? value : "-"}</p>
          <CustomImage
            width={24}
            height={24}
            src="/svg/calendar.svg"
            className=""
            alt="calendar"
          />
        </div>
      )}
    </div>
  );
};

export default QaDatePicker;
