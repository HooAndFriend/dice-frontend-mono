import useSWR from "swr";
import TeamContentView from "./team-content";
import { AuthState } from "@/src/app";
import { useRecoilValue } from "recoil";
import { GetUserTeamListResponse } from "@/src/type/team";
import { Get } from "@/src/repository";

const TeamContent = () => {
  const { accessToken } = useRecoilValue(AuthState);

  const { data, error, isLoading } = useSWR("/v1/team-user", async (url) =>
    Get<GetUserTeamListResponse>(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  );

  if (isLoading) return null;

  return <TeamContentView data={data.data.data} />;
};
export default TeamContent;
