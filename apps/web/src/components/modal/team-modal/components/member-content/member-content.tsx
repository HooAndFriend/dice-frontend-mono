// ** Type Imports
import { TeamUserInfo } from "@/src/type/team";

// ** Component Imports
import UserBox from "../user-box";

// ** Utils Imports
import { CopyToClipboard } from "react-copy-to-clipboard";
// ** Type Imports
import { RoleType } from "@/src/type/common";

interface PropsType {
  data: TeamUserInfo[];
  role: RoleType;
  uuid: string;
  handleDeleteTeamUser: (teamUserId: number) => void;
  handleTeamUserRole: (teamUserId: number, role: RoleType) => void;
  handleOpen: () => void;
}

const MemberContentView = ({
  handleOpen,
  data,
  uuid,
  role,
  handleTeamUserRole,
  handleDeleteTeamUser,
}: PropsType) => {
  return (
    <div>
      <div className="font-bold text-xl mb-[14px] font-spoqa">
        Invite Member
      </div>
      <div className="flex w-full">
        <input
          className="w-[611px] h-[50px] border border-[#EBEBEC] rounded-[10px] p-[15px] mr-[15px]"
          value={`${process.env.NEXT_PUBLIC_INVITE_PATH}?uuid=${uuid}`}
          disabled
        />
        <CopyToClipboard
          text={`${process.env.NEXT_PUBLIC_INVITE_PATH}?uuid=${uuid}`}
          onCopy={() => alert("Copied")}
        >
          <button className="w-[120px] h-[50px] text-white font-bold text-base bg-main font-spoqa tracking-[-1px] rounded-[10px]">
            COPY
          </button>
        </CopyToClipboard>
      </div>
      <div className="mt-[31px] flex w-full h-[23px] justify-between mb-[14px]">
        <div className="text-lg font-bold font-spoqa">Member</div>
        <div
          onClick={handleOpen}
          className="flex items-center justify-center font-bold font-spoqa font-base"
        >
          <img
            className="mr-[10px]"
            src="svg/addMember.svg"
            width={24}
            height={24}
          />
          AddMember
        </div>
      </div>
      <div>
        {data.map((item) => (
          <UserBox
            key={item.id}
            id={item.id}
            email={item.user.email}
            nickname={item.user.nickname}
            role={item.role}
            profile={item.user.profile}
            userRole={role}
            handleTeamUserRole={handleTeamUserRole}
            handleDeleteTeamUser={handleDeleteTeamUser}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberContentView;
