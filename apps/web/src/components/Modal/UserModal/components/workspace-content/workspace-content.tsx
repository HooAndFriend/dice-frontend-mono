// ** Component Imports
import ProfileBox from "../profile-box";

// ** Type Imports
import { WorksapceUserInfo } from "@/src/type/workspace";

interface PropsType {
  data: WorksapceUserInfo[];
}

const WorkspaceContentView = ({ data }: PropsType) => {
  return (
    <div className="w-full h-full">
      <h1 className="mb-5 text-2xl font-bold">Team List</h1>
      <div className="grid grid-cols-2 gap-6">
        {data.map((item) => (
          <ProfileBox
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

export default WorkspaceContentView;
