// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import { useAuthStateSSR, useTeamStateSSR } from "@/src/app";

// ** Component Imports
import WorkSpaceContentView from "./workspace-content";
import { GetTeamWorkspaceListResponse } from "@/src/type/workspace";

const WorkSpaceContent = () => {
  const [teamState, setTeamState] = useTeamStateSSR();
  const [authState, setAuthState] = useAuthStateSSR();

  const { data, error, isLoading } = useSWR(
    "/v1/workspace/list/popup",
    async (url) =>
      Get<GetTeamWorkspaceListResponse>(url, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
          "team-code": teamState.uuid,
        },
      })
  );

  if (isLoading) return null;

  return <WorkSpaceContentView data={data.data.data} />;
};

export default WorkSpaceContent;
