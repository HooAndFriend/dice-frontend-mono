// ** Next Imports
import Image from "next/image";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Type Imports
import { CommonResponse, RoleType } from "@/src/type/common";

// ** Service Imports
import { mutate } from "swr";
import { Delete, Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import CustomImage from "@/src/components/Image/CustomImage";

interface PropsType {
  id: number;
  email: string;
  profile: string;
  nickname: string;
  userRole: RoleType;
  role: RoleType;
}

const TeamMemberBox = ({
  email,
  profile,
  role,
  nickname,
  userRole,
  id,
}: PropsType) => {
  const { handleOpen } = useDialog();

  const updateTeamRole = useSWRMutation(
    "/v1/team-user",
    async (url: string, { arg }: { arg: RoleType }) =>
      await Patch<CommonResponse<void>>(url, {
        teamUserId: id,
        role: arg,
      }),
    {
      onSuccess: ({ data }) => {
        mutate("/v1/team-user/user");
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

  const removeTeamUser = useSWRMutation(
    `/v1/team-user/${id}`,
    async (url: string) => await Delete<CommonResponse<void>>(url),
    {
      onSuccess: ({ data }) => {
        mutate("/v1/team-user/user");
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
    <div className="mb-[21px] w-[full] h-20 border-[#EBEBEC] border shadow-md rounded-[15px] flex items-center justify-between">
      <div className="flex">
        <CustomImage
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
          className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] mr-[15px] pl-[15px] flex items-center cursor-pointer"
          disabled={userRole !== "ADMIN"}
          value={role}
          onChange={(e) => updateTeamRole.trigger(e.target.value as RoleType)}
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
          <CustomImage
            src="/svg/boldX.svg"
            alt="delete"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={removeTeamUser.trigger}
          />
        )}
      </div>
    </div>
  );
};

export default TeamMemberBox;
