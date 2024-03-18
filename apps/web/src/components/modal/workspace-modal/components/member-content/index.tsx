// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Component Imports
import MemberContentView from "./member-content";

// ** Type Imports
import { GetWorkspaceUserListResponse } from "@/src/type/workspace";

// ** Recoil Imports
import { AuthState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

interface PropsType {
  handleOpen: () => void;
}

const MemberContent = ({ handleOpen }: PropsType) => {
  const { uuid } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { data, error, isLoading } = useSWR("/v1/workspace-user", async (url) =>
    Get<GetWorkspaceUserListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "workspace-code": uuid,
      },
    })
  );

  if (isLoading) return;

  if (error) return;

  return <MemberContentView handleOpen={handleOpen} data={data.data.data} />;
};

export default MemberContent;
