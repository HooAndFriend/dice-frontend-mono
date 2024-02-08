// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState, TeamState } from "@/src/app";

// ** Component Imports
import WorkSpaceContentView from "./workspace-content";
import { GetTeamWorkspaceListResponse } from "@/src/type/workspace";

const WorkSpaceContent = () => {
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(TeamState);

  const { data, error, isLoading } = useSWR("/v1/workspace/list", async (url) =>
    Get<GetTeamWorkspaceListResponse>(url, {
      headers: { Authorization: `Bearer ${accessToken}`, "team-code": uuid },
    })
  );

  if (isLoading) return null;

  return <WorkSpaceContentView data={data.data.data} />;
};

export default WorkSpaceContent;
