"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** React Imports
import { useRef, useState } from "react";

// ** Component Imports

// ** Recoil Imports
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AuthState,
  TeamState,
  UserState,
  WorkspaceState,
  authInitState,
  teamInitState,
  userInitState,
  workspaceInitState,
} from "@/src/app";
import CustomImage from "../../Image/CustomImage";
import dayjs from "dayjs";
import NotificationItem from "./NotificationItem";

const NotificationPopover = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <div>
      <div
        onClick={handleOpen}
        className="flex items-center justify-center mr-6 cursor-pointer"
      >
        <CustomImage
          src="/svg/notification.svg"
          width={25}
          height={25}
          alt="notification"
        />
      </div>
      {open && (
        <>
          <div onClick={handleOpen} className="fixed inset-0 z-10" />
          <div className="popover p-5 rounded-[20px] w-[360px] h-[300px] absolute bg-white shadow-md p- translate-y-5 -translate-x-80 z-10 overflow-x-hidden overflow-y-auto">
            <div className="flex items-center">
              <h1>Notification</h1>
            </div>
            <hr className="my-3" />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPopover;
