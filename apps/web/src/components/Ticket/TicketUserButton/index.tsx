"use client";
// ** Next Imports
import Image from "next/image";

// ** React Imports
import { useEffect, useRef, useState, ChangeEvent } from "react";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { GetSearchWorkspaceUserListResponse } from "@/src/type/workspace";

// ** Swr Imports
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { Get, Put } from "@/src/repository";

interface PropsType {
  profile: string;
  ticketId: number;
  type: "user" | "admin";
}

const TicketUserButton = ({ profile, ticketId, type }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    "/v1/ticket/user",
    async (url: string, { arg }: { arg: number }) =>
      await Put<CommonResponse<void>>(url, { ticketId, type, userId: arg }),
    {
      onSuccess: () => {
        mutate("/v1/epic");
        mutate("/v1/ticket");
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
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleOpen();
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  useEffect(() => {
    refetch();
  }, [name]);

  return (
    <div className="relative">
      <div
        className="flex items-center"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <Image
          className="rounded-full border border-[#EBEBEC]"
          src={profile ? profile : "/images/dice.png"}
          alt="profile"
          width={30}
          height={30}
        />
      </div>
      {open && (
        <div
          className="absolute w-[200px] h-[150px] bg-slate-200 top-[50px] left-0 rounded-lg overflow-y-auto z-10"
          ref={dropdownRef}
        >
          <div className="flex items-center justify-center w-full px-2 py-2">
            <input
              type="text"
              className="w-full h-8 rounded-md"
              value={name}
              onChange={handleName}
            />
          </div>
          {data.data.data.map((item) => (
            <div
              className="flex items-center px-4 py-2 mt-2 hover:bg-slate-300"
              key={item.id}
              onClick={() => updateQaUser.trigger(item.teamUser.user.id)}
            >
              <Image
                className="rounded-full border border-[#EBEBEC] mr-[10px] "
                alt="profile"
                src={item.teamUser.user.profile}
                width={30}
                height={30}
              />
              <div className="font-spoqa">{item.teamUser.user.nickname}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketUserButton;
