// ** Next Imports
import Image from "next/image";

interface PropsType {
  id: number;
  workspaceId: number;
  profile: string;
  name: string;
  onClick: () => void;
}

const WorkspaceBox = ({
  profile,
  name,
  onClick,
  id,
  workspaceId,
}: PropsType) => {
  return (
    <div className="flex items-center mt-5" onClick={onClick}>
      <Image
        className="border rounded-[10px] mr-3"
        src={profile}
        alt="profile"
        width={30}
        height={30}
      />
      <h4 className={`${id === workspaceId && "text-[#623AD6]"}`}>{name}</h4>
    </div>
  );
};

export default WorkspaceBox;
