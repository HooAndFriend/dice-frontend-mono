// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import { useAuthStateSSR } from "@/src/app";

// ** Type Imports
import { GetUserWorkspaceListResponse } from "@/src/type/workspace";

// ** Components Imports
import WorkspaceContentView from "./workspace-content";

const WorkspaceContent = () => {
  const [authState, setAuthState] = useAuthStateSSR();

  const { data, error, isLoading } = useSWR(
    "/v1/workspace-user/my",
    async (url) =>
      Get<GetUserWorkspaceListResponse>(url, {
        headers: { Authorization: `Bearer ${authState.accessToken}` },
      })
  );

  if (isLoading) return null;

  return <WorkspaceContentView data={data.data.data} />;
};

export default WorkspaceContent;
