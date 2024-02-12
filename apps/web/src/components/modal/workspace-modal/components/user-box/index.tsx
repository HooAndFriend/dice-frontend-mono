import { RoleType } from "@/src/type/common";

interface PropsType {
  nickname: string;
  email: string;
  profile: string;
  role: RoleType;
}

const UserBox = ({ nickname, email, role, profile }: PropsType) => {
  return (
    <div className="mb-[21px] w-[726px] h-20 border-[#EBEBEC] border shadow-md rounded-[15px] flex items-center justify-between">
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
        >
          <option className="text-base font-spoqa" value="Admin">
            {role}
          </option>
        </select>
        <img
          src="svg/boldX.svg"
          width={24}
          height={24}
          onClick={() => console.log("Hello")}
        />
      </div>
    </div>
  );
};

export default UserBox;
