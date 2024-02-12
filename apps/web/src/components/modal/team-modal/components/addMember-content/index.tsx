// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState, TeamState } from "@/src/app";

// ** Component Imports
import AddMemberContentView from "./addMember-content";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { InviteTeamUserParam } from "@/src/type/team";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddMemberContent = ({ open, setOpen }: PropsType) => {
  const { data, handleInput, handleSelect } = useInput<InviteTeamUserParam>({
    email: "",
    role: "VIEWER",
  });

  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(TeamState);

  const { handleOpen } = useDialog();

  const inviteTeamUser = useSWRMutation(
    "/v1/team-user",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "team-code": uuid,
        },
      }),
    {
      onSuccess: () => {
        setOpen(false);
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

  return (
    <AddMemberContentView
      open={open}
      setOpen={setOpen}
      data={data}
      handleInput={handleInput}
      handleSelect={handleSelect}
      handleInvite={inviteTeamUser.trigger}
    />
  );
};

export default AddMemberContent;
