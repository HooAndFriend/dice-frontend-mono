import { RoleType } from "@/src/type/common";

interface PropsType {
  id: number;
  email: string;
  profile: string;
  nickname: string;
  userRole: RoleType;
  role: RoleType;
  handleTeamUserRole: (teamUserId: number, role: RoleType) => void;
  handleDeleteTeamUser: (teamUserId: number) => void;
}

const UserBox = ({
  email,
  profile,
  role,
  nickname,
  userRole,
  id,
  handleTeamUserRole,
  handleDeleteTeamUser,
}: PropsType) => {
  return (
    <div className="mb-[21px] w-[746px] h-20 border-[#EBEBEC] border shadow-md rounded-[15px] flex items-center justify-between">
      <div className="flex">
        <img
          src={profile}
          alt="Sample Image"
          width={45}
          height={45}
          className="rounded-full ml-[17px] mr-4 "
        />
        <div className="h-[45px]">
          <div className="text-base font-spoqa">{nickname}</div>
          <div className="font-spoqa text-base text-[#9A9A9A]">{email}</div>
        </div>
      </div>
      <div className="flex mr-[15px]">
        <select
          id="select1"
          className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] mr-[15px] pl-[15px] flex items-center"
          disabled={userRole !== "ADMIN"}
          value={role}
          onChange={(e) => handleTeamUserRole(id, e.target.value as RoleType)}
        >
          <option className="text-base font-spoqa" value="VIEWER">
            VIEWER
          </option>
          <option className="text-base font-spoqa" value="WRITER">
            WRITER
          </option>
          <option className="text-base font-spoqa" value="ADMIN">
            ADMIN
          </option>
        </select>
        {userRole === "ADMIN" && (
          <img
            src="svg/boldX.svg"
            width={24}
            height={24}
            onClick={() => handleDeleteTeamUser(id)}
          />
        )}
      </div>
    </div>
  );
};

export default UserBox;
