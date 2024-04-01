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

interface PropsType {
  value: string;
  qaId: number;
}

const QaDatePicker = ({ value, qaId }: PropsType) => {
  const { uuid } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen } = useDialog();

  // ** QA 수정
  const updateQa = useSWRMutation(
    "v1/qa/dueDate",
    async (url: string, { arg }: { arg: string }) =>
      await Put<CommonResponse<void>>(
        url,
        { qaId, dueDate: arg },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "workspace-code": `${uuid}`,
          },
        },
      ),
    {
      onSuccess: () => {
        mutate("/v1/qa");
        mutate(`/v1/qa/${qaId}`);
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
    },
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQa.trigger(e.target.value);
  };

  return (
    <input
      type="date"
      value={value}
      onChange={handleOnChange}
      className="h-[20px] border-none"
    />
  );
};

export default QaDatePicker;
