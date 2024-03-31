// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Component Imports
import WorkspaceUserBox from "../WorkspaceUserBox";

// ** Type Imports
import { GetWorkspaceUserListResponse } from "@/src/type/workspace";

// ** Recoil Imports
import { AuthState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

interface PropsType {
  handleOpen: () => void;
}

const WorkspaceMemberContent = ({ handleOpen }: PropsType) => {
  const { uuid } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { data, error, isLoading } = useSWR("/v1/workspace-user", async (url) =>
    Get<GetWorkspaceUserListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "workspace-code": uuid,
      },
    }),
  );

  if (isLoading) return;

  if (error) return;

  return (
    <div>
      <div onClick={handleOpen} className="flex justify-end w-full h-6">
        <img className="mr-[10px]" src="/svg/addMember.svg" alt="addMember" />
        <div className="text-base font-bold font-spoqa">Add Member</div>
      </div>
      <div className="w-full h-[562px] mt-[29px]">
        {data.data.data.map((item) => (
          <WorkspaceUserBox
            key={item.id}
            id={item.id}
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

export default WorkspaceMemberContent;
