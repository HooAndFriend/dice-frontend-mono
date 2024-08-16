// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Type Imports
import { GetUserWorkspaceListResponse } from "@/src/type/workspace";

// ** Component Imports
import UserProfileBox from "../UserProfileBox";

const UserWorkspaceContent = () => {
  const { data, error, isLoading } = useSWR(
    "/v1/workspace-user/my",
    async (url) => Get<GetUserWorkspaceListResponse>(url)
  );

  if (isLoading) return;

  return (
    <div className="w-full h-full">
      <h1 className="mb-5 text-[20px] font-san-bold">Workspace List</h1>
      <div className="grid grid-cols-2 gap-6">
        {data.data.data.map((item) => (
          <UserProfileBox
            key={item.id}
            name={item.workspace.name}
            role={item.role}
            profile={item.workspace.profile}
          />
        ))}
      </div>
    </div>
  );
};

export default UserWorkspaceContent;
