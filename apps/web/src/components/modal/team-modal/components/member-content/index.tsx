// ** Swr Imports
import useSWR, { mutate } from "swr";
import { Get, Patch, Delete } from "@/src/repository";

// ** Recoil Imports
import { AuthState, TeamState } from "@/src/app";
import { useRecoilValue } from "recoil";

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
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid, role } = useRecoilValue(TeamState);

  const { handleOpen: handleDialogOpen } = useDialog();

  const { data, error, isLoading } = useSWR("/v1/team-user/user", async (url) =>
    Get<GetTeamUserListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "team-code": uuid,
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
          Authorization: `Bearer ${accessToken}`,
          "team-code": uuid,
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
        Authorization: `Bearer ${accessToken}`,
        "team-code": uuid,
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

  if (error) return;

  return (
    <MemberContentView
      handleOpen={handleOpen}
      data={data.data.data}
      uuid={uuid}
      role={role}
    />
  );
};

export default MemberContent;
