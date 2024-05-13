// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Component Imports
import TeamWorkspaceBox from "../TeamWorkspaceBox";

// ** Type Imports
import { GetTeamWorkspaceListResponse } from "@/src/type/workspace";

const TeamWorkSpaceContent = () => {
  const { data, error, isLoading } = useSWR(
    "/v1/workspace/list/popup",
    async (url) => Get<GetTeamWorkspaceListResponse>(url)
  );

  if (isLoading) return;

  if (error) return;

  return (
    <div className="w-full h-full">
      <h1 className="mb-5 text-[18px] font-san-bold">Workspace List</h1>
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
