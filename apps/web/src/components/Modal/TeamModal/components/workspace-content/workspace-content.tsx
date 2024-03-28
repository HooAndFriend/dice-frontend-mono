// ** Type Imports
import { TeamWorkspaceInfo } from "@/src/type/workspace";

// ** Component Imports
import ProfileBox from "../profile-box";

interface PropsType {
  data: TeamWorkspaceInfo[];
}

const WorkSpaceContentView = ({ data }: PropsType) => {
  return (
    <div className="w-full h-full">
      <h1 className="mb-5 text-2xl font-bold">Workspace List</h1>
      <div className="grid grid-cols-2 gap-6">
        {data.map((item) => (
          <ProfileBox
            key={item.workspace_id}
            name={item.workspace_name}
            profile={item.workspace_profile}
            count={item.workspaceUserCount}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkSpaceContentView;
