"use client";

// ** Next Imports
import Link from "next/link";

// ** Component Imports
import CustomImage from "../../Image/CustomImage";
import UserPopover from "../../Popover/UserPopover";
import NotificationPopover from "../../Popover/NotificationPopover";

const DashboardHeader = () => {
  return (
    <div className="h-[60px] border-b-2 border-[#EBEBEC] flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/dashboard">
          <CustomImage
            src="/images/logo.png"
            width={110}
            height={30}
            alt="logo"
            className="ml-[30px]"
          />
        </Link>
      </div>
      <div className="flex items-center mr-[30px]">
        <NotificationPopover />
        <UserPopover />
      </div>
    </div>
  );
};

export default DashboardHeader;
