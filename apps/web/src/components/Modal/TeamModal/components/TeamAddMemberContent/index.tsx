// ** Recoil Imports
import { AuthState, TeamState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { InviteTeamUserParam } from "@/src/type/team";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TeamAddMemberContent = ({ open, setOpen }: PropsType) => {
  const { data, handleInput, handleSelect } = useInput<InviteTeamUserParam>({
    email: "",
    role: "VIEWER",
  });

  const { uuid } = useRecoilValue(TeamState);
  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen } = useDialog();

  const inviteTeamUser = useSWRMutation(
    "/v1/team-user",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "team-code": uuid,
        },
      }),
    {
      onSuccess: () => {
        setOpen(false);
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
    },
  );

  return (
    <div
      className={`bg-black bg-opacity-25 w-full h-screen font-spoqa flex justify-center items-center fixed top-0 left-0 z-50 ${
        open ? "" : "hidden"
      }`}
    >
      <div className="w-[617px] h-[171px] rounded-[20px] bg-white pl-[34px] mr-[30px]">
        <div className=" h-[22px] w-full text-xl font-bold mt-[30px] flex justify-between">
          Add Member
          <img
            onClick={() => setOpen(false)}
            className="mr-[30px]"
            src="/svg/XButton.svg"
          />
        </div>
        <div className="w-full h-[50px] flex mt-[23px]">
          <div className="w-[316px] h-full border border-[#EBEBEC] rounded-[10px] flex pl-4 items-center">
            <input
              className="focus:outline-none w-[280px]"
              placeholder="Enter Email or nickName"
              name="email"
              value={data.email}
              onChange={handleInput}
            />
          </div>
          <select
            id="select2"
            className="p-[15px] ml-[10px] w-[111px] h-full text-[#DDDDDD] focus:outline-none border border-[#EBEBEC] rounded-[10px]"
            value={data.role}
            onChange={handleSelect}
            name="role"
          >
            <option value="VIEWER">VIEWER</option>
            <option value="WRITER">WRITER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button
            className="bg-main w-[110px] ml-[10px] rounded-[10px] text-white font-bold tracking-[-1px]"
            onClick={inviteTeamUser.trigger}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamAddMemberContent;
