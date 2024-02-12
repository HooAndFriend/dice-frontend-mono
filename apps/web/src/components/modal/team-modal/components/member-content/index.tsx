// ** Swr Imports
import useSWR, { mutate } from "swr";
import { Get, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState, TeamState } from "@/src/app";

// ** Component Imports
import MemberContentView from "./member-content";

// ** TYpe Imports
import { GetTeamUserListResponse } from "@/src/type/team";

interface PropsType {
  handleOpen: () => void;
}

const MemberContent = ({ handleOpen }: PropsType) => {
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(TeamState);

  const { data, error, isLoading } = useSWR("/v1/team-user/user", async (url) =>
    Get<GetTeamUserListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "team-code": uuid,
      },
    })
  );

  if (isLoading) return;

  return (
    <MemberContentView
      handleOpen={handleOpen}
      data={data.data.data}
      uuid={uuid}
    />
  );
};

export default MemberContent;
