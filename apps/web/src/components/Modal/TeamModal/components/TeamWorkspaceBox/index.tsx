// ** Next Imports
import CustomImage from "@/src/components/Image/CustomImage";
import Image from "next/image";

interface PropsType {
  name: string;
  profile: string;
  count: string;
}

const TeamWorkspaceBox = ({ name, profile, count }: PropsType) => {
  return (
    <div className="w-[361px] h-[89px] p-[25px] shadow-md flex items-center text-center justify-between rounded-[15px]">
      <div className="flex text-center items-center font-spoqa tracking-[-1px]">
        <CustomImage
          className="mr-4 rounded-full"
          src={profile}
          alt="profile"
          width={39}
          height={39}
        />
        {name}
      </div>
      <div className="font-spoqa tracking-[-1px]">{count}</div>
    </div>
  );
};

export default TeamWorkspaceBox;
