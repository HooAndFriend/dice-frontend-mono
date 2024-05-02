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
import CustomImage from "@/src/components/Image/CustomImage";

interface PropsType {
  profile: string;
  nickname: string;
  email: string;
  width?: string | number;
  height?: string | number;
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
        <img
          className="rounded-full border border-[#EBEBEC] mr-[10px] "
          src={profile}
          width={width ? width : 30}
          height={height ? height : 30}
        />
        <div className="font-spoqa">{nickname}</div>
      </div>
      {open && (
        <div
          className="absolute w-[222px] h-[158px] bg-white shadow-lg top-[50px] left-0 rounded-lg overflow-y-auto z-10 overflow-x-hidden"
          ref={dropdownRef}
        >
          <div className="flex items-center justify-center w-full px-2 py-2">
            <input
              type="text"
              className="w-full h-8 border-none focus:outline-none"
              value={name}
              onChange={handleName}
              placeholder="Search.."
            />
          </div>
          <hr className="w-full" />
          <div className="px-[8px] py-[8px]">
            {data.data.data.map((item) => (
              <div
                className="flex w-[206px] h-[32px] items-center rounded-[8px] cursor-pointer"
                key={item.id}
                onClick={() => updateQaUser.trigger(item.teamUser.user.id)}
                style={{
                  backgroundColor:
                    item.teamUser.user.email === email ? "#F4F4FA" : "white",
                }}
              >
                <CustomImage
                  className="rounded-full border border-[#EBEBEC] mr-[10px]"
                  alt="profile"
                  src={item.teamUser.user.profile}
                  width={20}
                  height={20}
                />
                <p className="text-[12px]">{item.teamUser.user.nickname}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QaUserButton;