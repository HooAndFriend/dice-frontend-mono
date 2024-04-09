// ** Next Imports
import Image from "next/image";

// ** Swr Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Recoil Imports
import { TeamState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Component Imports
import TeamMemberBox from "../TeamMemberBox";

// ** Type Imports
import { GetTeamUserListResponse } from "@/src/type/team";

// ** Utils Imports
import { CopyToClipboard } from "react-copy-to-clipboard";

interface PropsType {
  handleOpen: () => void;
}

const TeamMemberContent = ({ handleOpen }: PropsType) => {
  const { uuid, role } = useRecoilValue(TeamState);

  const { data, error, isLoading } = useSWR("/v1/team-user/user", async (url) =>
    Get<GetTeamUserListResponse>(url)
  );

  if (isLoading) return;

  if (error) return;

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
          <Image
            alt="addMember"
            className="mr-[10px]"
            src="/svg/addMember.svg"
            width={24}
            height={24}
          />
          AddMember
        </div>
      </div>
      <div className="h-[420px] w-full overflow-y-auto overflow-x-hidden">
        {data.data.data.map((item) => (
          <TeamMemberBox
            key={item.id}
            id={item.id}
            email={item.user.email}
            nickname={item.user.nickname}
            role={item.role}
            profile={item.user.profile}
            userRole={role}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamMemberContent;
