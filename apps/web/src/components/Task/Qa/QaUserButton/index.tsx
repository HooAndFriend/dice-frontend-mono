"use client";

// ** React Imports
import { useEffect, useState, ChangeEvent } from "react";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { GetSearchWorkspaceUserListResponse } from "@/src/type/workspace";

// ** Swr Imports
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { Get, Put } from "@/src/repository";

// ** Component Imports
import UserSelectPopover from "../../Common/Popover/UserSelectPopover";

interface PropsType {
  profile: string;
  nickname: string;
  email: string;
  width?: number;
  height?: number;
  qaId: number;
  type: "user" | "admin";
}

const QaUserButton = ({
  profile,
  nickname,
  email,
  width,
  height,
  qaId,
  type,
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const { handleOpen: handleDialogOpen } = useDialog();

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOpen = () => {
    setOpen((c) => !c);
  };

  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR("/v1/workspace-user/search", async (url) =>
    Get<GetSearchWorkspaceUserListResponse>(url, {
      params: { name },
    })
  );

  const updateQaUser = useSWRMutation(
    "v1/qa/user",
    async (url: string, { arg }: { arg: number }) =>
      await Put<CommonResponse<void>>(url, { qaId, type, userId: arg }),
    {
      onSuccess: () => {
        mutate("/v1/qa");
        mutate(`/v1/qa/${qaId}`);
        setOpen(false);
      },
      onError: (error) => {
        handleDialogOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [name]);

  return (
    <UserSelectPopover
      open={open}
      name={name}
      email={email}
      profile={profile}
      nickname={nickname}
      width={width}
      height={height}
      isNickname={true}
      isLoading={isLoading}
      data={isLoading ? [] : data.data.data}
      handleOpen={handleOpen}
      handleName={handleName}
      handleUpdateUser={updateQaUser.trigger}
    />
  );
};

export default QaUserButton;
