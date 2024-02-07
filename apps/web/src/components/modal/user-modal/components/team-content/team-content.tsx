// ** Component Imports
import ProfileBox from "../profile-box";

// ** Type Imports
import { TeamInfo } from "@/src/type/team";

interface PropsType {
  data: TeamInfo[];
}

const TeamContentView = ({ data }: PropsType) => {
  return (
    <div className="w-full h-full">
      <h1 className="mb-5 text-2xl font-bold">Team List</h1>
      <div className="grid grid-cols-2 gap-6">
        {data.map((item) => (
          <ProfileBox
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
export default TeamContentView;
