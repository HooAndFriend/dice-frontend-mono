import { WorkspaceUserDetailInfo } from "@/src/type/workspace";
import UserBox from "../user-box";

interface PropsType {
  data: WorkspaceUserDetailInfo[];
  handleOpen: () => void;
}

const MemberContentView = ({ handleOpen, data }: PropsType) => {
  return (
    <div>
      <div onClick={handleOpen} className="flex justify-end w-full h-6">
        <img className="mr-[10px]" src="svg/addMember.svg" alt="addMember" />
        <div className="text-base font-bold font-spoqa">Add Member</div>
      </div>
      <div className="w-full h-[562px] mt-[29px]">
        {data.map((item) => (
          <UserBox
            key={item.id}
            email={item.teamUser.user.email}
            profile={item.teamUser.user.profile}
            nickname={item.teamUser.user.nickname}
            role={item.role}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberContentView;
