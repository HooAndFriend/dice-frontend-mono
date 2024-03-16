// ** Swr Imports
import useSWR, { mutate } from "swr";
import { Get, Patch, Delete } from "@/src/repository";

// ** Recoil Imports
import { useAuthStateSSR, useTeamStateSSR } from "@/src/app";

// ** Component Imports
import MemberContentView from "./member-content";

// ** Type Imports
import { GetTeamUserListResponse } from "@/src/type/team";
import { CommonResponse, RoleType } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  handleOpen: () => void;
}

const MemberContent = ({ handleOpen }: PropsType) => {
  const [teamState, setTeamState] = useTeamStateSSR();
  const [authState, setAuthState] = useAuthStateSSR();

  const { handleOpen: handleDialogOpen } = useDialog();

  const { data, error, isLoading } = useSWR("/v1/team-user/user", async (url) =>
    Get<GetTeamUserListResponse>(url, {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        "team-code": teamState.uuid,
      },
    })
  );

  const handleTeamUserRole = async (teamUserId: number, role: RoleType) => {
    await Patch<CommonResponse<void>>(
      "/v1/team-user",
      {
        teamUserId,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
          "team-code": teamState.uuid,
        },
      }
    )
      .then((res) => {
        mutate("/v1/team-user/user");
      })
      .catch((error) => {
        handleDialogOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      });
  };

  const handleDeleteTeamUser = async (teamUserId) => {
    await Delete<CommonResponse<void>>(`/v1/team-user/${teamUserId}`, {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        "team-code": teamState.uuid,
      },
    })
      .then((res) => {
        mutate("/v1/team-user/user");
      })
      .catch((error) => {
        handleDialogOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      });
  };

  if (isLoading) return;

  return (
    <MemberContentView
      handleOpen={handleOpen}
      data={data.data.data}
      uuid={teamState.uuid}
      role={teamState.role}
      handleTeamUserRole={handleTeamUserRole}
      handleDeleteTeamUser={handleDeleteTeamUser}
    />
  );
};

export default MemberContent;
