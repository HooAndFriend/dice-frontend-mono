import { RoleType } from "@/src/type/common";
import Image from "next/image";

interface PropsType {
  name: string;
  profile: string;
  role: RoleType;
}

const UserProfileBox = ({ name, profile, role }: PropsType) => {
  return (
    <div className="w-[361px] h-[89px] rounded-3xl shadow-md flex items-center justify-between p-5">
      <div className="flex items-center">
        <Image
          width={40}
          height={40}
          src={profile}
          alt="profile"
          className="rounded-[20px]"
        />
        <h1 className="ml-3">{name}</h1>
      </div>
      <h1>{role}</h1>
    </div>
  );
};

export default UserProfileBox;
