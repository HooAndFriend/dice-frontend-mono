// ** Component Imports
import UserProfileBox from "../UserProfileBox";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetUserTeamListResponse } from "@/src/type/team";

const UserTeamContent = () => {
  const { data, error, isLoading } = useSWR("/v1/team-user", async (url) =>
    Get<GetUserTeamListResponse>(url)
  );

  if (isLoading) return;

  return (
    <div className="w-full h-full">
      <h1 className="mb-5 text-[20px] font-san-bold">Team List</h1>
      <div className="grid grid-cols-2 gap-6">
        {data.data.data.map((item) => (
          <UserProfileBox
            key={item.id}
            name={item.team.name}
            role={item.role}
            profile={item.team.profile}
          />
        ))}
      </div>
    </div>
  );
};
export default UserTeamContent;
