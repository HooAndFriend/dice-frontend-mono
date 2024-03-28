// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import { AuthState, TeamState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Component Imports
import WorkSpaceContentView from "./workspace-content";
import { GetTeamWorkspaceListResponse } from "@/src/type/workspace";

const WorkSpaceContent = () => {
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

  if (isLoading) return null;

  if (error) return;

  return <WorkSpaceContentView data={data.data.data} />;
};

export default WorkSpaceContent;
