// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import { AuthState, TeamState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Component Imports
import TeamWorkspaceBox from "../TeamWorkspaceBox";

// ** Type Imports
import { GetTeamWorkspaceListResponse } from "@/src/type/workspace";

const TeamWorkSpaceContent = () => {
  const { uuid } = useRecoilValue(TeamState);
  const { accessToken } = useRecoilValue(AuthState);

  const { data, error, isLoading } = useSWR(
    "/v1/workspace/list/popup",
    async (url) =>
      Get<GetTeamWorkspaceListResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "team-code": uuid,
        },
      }),
  );

  if (isLoading) return;

  if (error) return;

  return (
    <div className="w-full h-full">
      <h1 className="mb-5 text-2xl font-bold">Workspace List</h1>
      <div className="grid grid-cols-2 gap-6">
        {data.data.data.map((item) => (
          <TeamWorkspaceBox
            key={item.workspace_id}
            name={item.workspace_name}
            profile={item.workspace_profile}
            count={item.workspaceUserCount}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamWorkSpaceContent;
