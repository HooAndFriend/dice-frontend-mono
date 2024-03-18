// ** Component Imports
import TeamContentView from "./team-content";

// ** Recoil Imports
import { AuthState } from "@/src/app";
import { useRecoilValue } from "recoil";
// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetUserTeamListResponse } from "@/src/type/team";

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
