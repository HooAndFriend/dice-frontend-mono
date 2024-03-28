// ** Type Imports
import { CommonResponse, RoleType } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Recoil Imports
import { AuthState, TeamState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Service Imports
import { mutate } from "swr";
import { Delete, Patch, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

interface PropsType {
  id: number;
  nickname: string;
  email: string;
  profile: string;
  role: RoleType;
}

const WorkspaceUserBox = ({
  id,
  nickname,
  email,
  role,

  profile,
}: PropsType) => {
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid, role: userRole } = useRecoilValue(WorkspaceState);

  const { handleOpen } = useDialog();

  const updateWorkspaceRole = useSWRMutation(
    "/v1/workspace-user",
    async (url: string, { arg }: { arg: RoleType }) =>
      await Put<CommonResponse<void>>(
        url,
        {
          id,
          role: arg,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "workspace-code": uuid,
          },
        }
      ),
    {
      onSuccess: ({ data }) => {
        mutate("/v1/workspace-user");
      },
      onError: (error) => {
        handleOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  const removeWorkspaceUser = useSWRMutation(
    `/v1/workspace-user/${id}`,
    async (url: string) =>
      await Delete<CommonResponse<void>>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "workspace-code": uuid,
        },
      }),
    {
      onSuccess: ({ data }) => {
        mutate("/v1/workspace-user");
      },
      onError: (error) => {
        handleOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

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
          disabled={userRole !== "ADMIN"}
          value={role}
          className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] mr-[15px] pl-[15px] flex items-center"
          onChange={(e) =>
            updateWorkspaceRole.trigger(e.target.value as RoleType)
          }
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
        <img
          src="/svg/boldX.svg"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={removeWorkspaceUser.trigger}
        />
      </div>
    </div>
  );
};

export default WorkspaceUserBox;
