"use client";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import CustomImage from "../../Image/CustomImage";
import NotificationItem from "./NotificationItem";

// ** Service Imports
import { Get, Put } from "@/src/repository";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

// ** Type Imports
import { GetNotificationListResponse } from "@/src/type/notification";
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

const NotificationPopover = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((cur) => !cur);

  const { handleOpen: handleDialogOpen } = useDialog();

  const { error, isLoading, data, mutate } = useSWR(
    "/push/v1/notification",
    async (url) => Get<GetNotificationListResponse>(url)
  );

  const readNotification = useSWRMutation(
    "/push/v1/notification",
    async (url: string) => await Put<CommonResponse<void>>(url),
    {
      onSuccess: () => {
        mutate();
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ position: "relative" }}>
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
          {!isLoading && data.data.count && (
            <div
              style={{ position: "absolute", top: -5, left: 15 }}
              className="w-[15px] h-[15px] rounded-full bg-red-600 flex items-center justify-center"
            >
              <h1 className="text-white text-[12px]">{data.data.count}</h1>
            </div>
          )}
        </div>
      </div>
      {open && (
        <>
          <div onClick={handleOpen} className="fixed inset-0 z-10" />
          <div className="popover p-5 rounded-[20px] w-[360px] h-[300px] absolute bg-white shadow-md p- translate-y-5 -translate-x-80 z-10 overflow-x-hidden overflow-y-auto">
            <div className="flex items-end justify-between">
              <h1>Notification</h1>
              <p
                className="text-gray-500 cursor-pointer text-[12px] mr-2"
                onClick={readNotification.trigger}
              >
                Read All
              </p>
            </div>
            <hr className="my-3" />
            {!isLoading &&
              data.data.data.map((item) => (
                <NotificationItem key={item.id} data={item} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPopover;
