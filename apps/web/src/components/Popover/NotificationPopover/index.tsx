"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import CustomImage from "../../Image/CustomImage";
import NotificationItem from "./NotificationItem";

// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

const NotificationPopover = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((cur) => !cur);

  // const { error, isLoading, data } = useSWR("/push/v1", async (url) =>
  //   Get<any>(url)
  // );

  // if (isLoading) return <div>Loading...</div>;

  // console.log(data);

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
