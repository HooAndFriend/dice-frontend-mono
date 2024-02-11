import useSWR from "swr";
import MemberContentView from "./member-content";
import { Get } from "@/src/repository";
import { GetWorkspaceUserListResponse } from "@/src/type/workspace";
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";

interface PropsType {
  handleOpen: () => void;
}

const MemberContent = ({ handleOpen }: PropsType) => {
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(WorkspaceState);

  const { data, error, isLoading } = useSWR("/v1/workspace-user", async (url) =>
    Get<GetWorkspaceUserListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "workspace-code": uuid,
      },
    })
  );

  return <MemberContentView handleOpen={handleOpen} data={data.data.data} />;
};

export default MemberContent;
