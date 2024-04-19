// ** React Imports
import { useState } from "react";

// ** Service Imports
import useSWR from "swr";
import { Get, Post } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Type Imports
import {
  GetWorkspaceUserInviteListResponse,
  WorkspaceInviteUser,
} from "@/src/type/workspace";
import { CommonResponse, RoleType } from "@/src/type/common";
import Image from "next/image";
import CustomImage from "@/src/components/Image/CustomImage";

interface PropsType {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const WorkspaceAddMemberContent = ({ open, setOpen }: PropsType) => {
  const [word, setWord] = useState<string>("");
  const [role, setRole] = useState<RoleType>("VIEWER");
  const [inviteUserList, setInvietUserList] = useState<WorkspaceInviteUser[]>(
    []
  );

  const { handleOpen } = useDialog();

  const { data, error, isLoading, mutate } = useSWR(
    "/v1/workspace-user/invite",
    async (url) => Get<GetWorkspaceUserInviteListResponse>(url)
  );

  const inviteWorkspaceUser = useSWRMutation(
    "/v1/workspace-user",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, {
        teamUserId: inviteUserList.map((item) => item.id),
        role: "VIEWER",
      }),
    {
      onSuccess: ({ data }) => {
        mutate();
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
    }
  );

  const handleAddInviteUser = (data: WorkspaceInviteUser) => {
    setInvietUserList((cur) => [...cur, data]);
  };

  const handleRemoveInviteUser = (id: number) => {
    setInvietUserList((cur) => cur.filter((item) => item.id !== id));
  };

  if (isLoading) return;

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
          <div className="">
            <div className="h-full border border-[#EBEBEC] rounded-[10px] px-4 flex items-center">
              {inviteUserList.map((item) => (
                <div className="p-2 bg-[#F4F4FA] h-[29px] rounded-lg flex items-center mr-[10px]">
                  <CustomImage
                    className="mx-2 rounded-full"
                    alt="profile"
                    src={item.user.profile}
                    width={17}
                    height={17}
                  />
                  <div className="h-[29px] font-spoqa text-xs flex items-center">
                    {item.user.nickname}
                  </div>
                  <CustomImage
                    alt="boldX"
                    className="ml-2 cursor-pointer"
                    src="/svg/boldX.svg"
                    width={13}
                    height={13}
                    onClick={() => handleRemoveInviteUser(item.id)}
                  />
                </div>
              ))}
              <input
                className="focus:outline-none w-[249px]"
                placeholder="Enter Email or nickName"
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
              <select
                id="select2"
                className="w-[50px] text-[#676767] focus:outline-none border-none"
                style={{ padding: 0 }}
                value={role}
                onChange={(e) => setRole(e.target.value as RoleType)}
              >
                <option className="w-full" value={"VIEWER"}>
                  VIEWER
                </option>
                <option className="w-full" value={"WRITEER"}>
                  WRITEER
                </option>
                <option className="w-full" value={"ADMIN"}>
                  ADMIN
                </option>
              </select>
            </div>
            <div className="py-4 bg-white">
              {word.length > 0 &&
                data.data.data
                  .filter(
                    (item) =>
                      item.user.email.includes(word) ||
                      item.user.nickname.includes(word)
                  )
                  .filter(
                    (item) =>
                      inviteUserList.findIndex((_) => _.id === item.id) === -1
                  )
                  .map((item) => (
                    <div
                      className="flex items-center w-full px-4 py-2 hover:bg-slate-300"
                      key={item.id}
                      onClick={() => handleAddInviteUser(item)}
                    >
                      <img
                        src={item.user.profile}
                        alt="profile"
                        className="w-[30px] h-[30px] rounded-full mr-4"
                      />
                      <h1>{`${item.user.nickname} (${item.user.email})`}</h1>
                    </div>
                  ))}
            </div>
          </div>
          <button
            className="bg-main w-[110px] ml-[7px] rounded-[10px] text-white font-bold"
            onClick={inviteWorkspaceUser.trigger}
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceAddMemberContent;
