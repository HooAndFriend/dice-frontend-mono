// ** Component Imports
import TeamContentView from "./team-content";

// ** Recoil Imports
import { useAuthStateSSR } from "@/src/app";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetUserTeamListResponse } from "@/src/type/team";

const TeamContent = () => {
  const [authState, setAuthState] = useAuthStateSSR();

  const { data, error, isLoading } = useSWR("/v1/team-user", async (url) =>
    Get<GetUserTeamListResponse>(url, {
      headers: { Authorization: `Bearer ${authState.accessToken}` },
    })
  );

  if (isLoading) return null;

  return <TeamContentView data={data.data.data} />;
};
export default TeamContent;
