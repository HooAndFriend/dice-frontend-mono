// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import { AuthState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Type Imports
import { GetUserWorkspaceListResponse } from "@/src/type/workspace";

// ** Components Imports
import WorkspaceContentView from "./workspace-content";

const WorkspaceContent = () => {
  const { accessToken } = useRecoilValue(AuthState);

  const { data, error, isLoading } = useSWR(
    "/v1/workspace-user/my",
    async (url) =>
      Get<GetUserWorkspaceListResponse>(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
  );

  if (isLoading) return null;

  return <WorkspaceContentView data={data.data.data} />;
};

export default WorkspaceContent;
