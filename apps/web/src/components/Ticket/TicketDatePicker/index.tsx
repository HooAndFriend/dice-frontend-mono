// ** Service Imports
import { mutate } from "swr";
import { Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import { useState } from "react";
import CustomImage from "../../Image/CustomImage";

interface PropsType {
  value: string;
  ticketId: number;
}

const TicketDatePicker = ({ value, ticketId }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);
  const { handleOpen: handleDialogOpen } = useDialog();

  const updateTicket = useSWRMutation(
    "v1/ticket/dueDate",
    async (url: string, { arg }: { arg: string }) =>
      await Patch<CommonResponse<void>>(url, { ticketId, dueDate: arg }),
    {
      onSuccess: () => {
        mutate("/v1/epic");
        mutate("/v1/ticket");
        mutate(`/v1/ticket/detail/${ticketId}`);
        handleOpen();
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
    updateTicket.trigger(e.target.value);
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
          className="flex items-center px-[16px] h-[40px] bg-[#F2F4F6] rounded-[5px] w-[240px] justify-between"
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

export default TicketDatePicker;
