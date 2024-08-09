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
  userId: number;
  email: string;
  ticketId: number;
  nickname?: string;
  isNickname?: boolean;
  type: "user" | "admin";
}

const TicketUserButton = ({
  profile,
  ticketId,
  email,
  isNickname,
  type,
  nickname,
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

  const updateTicketUser = useSWRMutation(
    "/v1/ticket/user",
    async (url: string, { arg }: { arg: number }) =>
      await Put<CommonResponse<void>>(url, { ticketId, type, userId: arg }),
    {
      onSuccess: () => {
        mutate("/v1/ticket");
        mutate("/v1/epic");
        mutate(`/v1/ticket/detail/${ticketId}`);
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
      isLoading={isLoading}
      data={isLoading ? [] : data.data.data}
      isNickname={isNickname}
      handleOpen={handleOpen}
      handleName={handleName}
      handleUpdateUser={updateTicketUser.trigger}
    />
  );
};

export default TicketUserButton;
