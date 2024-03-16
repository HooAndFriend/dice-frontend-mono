// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Component Imports
import MemberContentView from "./member-content";

// ** Type Imports
import { GetWorkspaceUserListResponse } from "@/src/type/workspace";

// ** Recoil Imports
import { useAuthStateSSR, useWorkspaceStateSSR } from "@/src/app";

interface PropsType {
  handleOpen: () => void;
}

const MemberContent = ({ handleOpen }: PropsType) => {
  const [workspaceState, setWorkspaceState] = useWorkspaceStateSSR();
  const [authState, setAuthState] = useAuthStateSSR();

  const { data, error, isLoading } = useSWR("/v1/workspace-user", async (url) =>
    Get<GetWorkspaceUserListResponse>(url, {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        "workspace-code": workspaceState.uuid,
      },
    })
  );

  return <MemberContentView handleOpen={handleOpen} data={data.data.data} />;
};

export default MemberContent;
