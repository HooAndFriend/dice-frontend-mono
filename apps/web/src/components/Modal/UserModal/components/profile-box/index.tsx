import { RoleType } from "@/src/type/common";

interface PropsType {
  name: string;
  profile: string;
  role: RoleType;
}

const ProfileBox = ({ name, profile, role }: PropsType) => {
  return (
    <div className="w-[361px] h-[89px] rounded-3xl shadow-md flex items-center justify-between p-5">
      <div className="flex items-center">
        <img
          width="40px"
          height="40px"
          src={profile}
          alt="profile"
          className="rounded-full"
        />
        <h1 className="ml-3">{name}</h1>
      </div>
      <h1>{role}</h1>
    </div>
  );
};

export default ProfileBox;
