// ** Service Imports
import { mutate } from "swr";
import { Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  value: string;
  ticketId: number;
}

const TicketDatePicker = ({ value, ticketId }: PropsType) => {
  const { handleOpen } = useDialog();

  const updateTicket = useSWRMutation(
    "v1/ticket/dueDate",
    async (url: string, { arg }: { arg: string }) =>
      await Patch<CommonResponse<void>>(url, { ticketId, dueDate: arg }),
    {
      onSuccess: () => {
        mutate("/v1/epic");
        mutate("/v1/ticket");
        mutate(`/v1/ticket/detail/${ticketId}`);
      },
      onError: (error) => {
        handleOpen({
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
      {value ? (
        <input
          type="date"
          value={value}
          onChange={handleOnChange}
          className="h-[20px] border-none"
        />
      ) : (
        "-"
      )}
    </div>
  );
};

export default TicketDatePicker;
