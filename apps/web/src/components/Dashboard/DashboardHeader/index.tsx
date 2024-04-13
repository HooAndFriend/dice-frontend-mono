"use client";

// ** Next Imports
import Link from "next/link";
import Image from "next/image";

// ** React Imports
import { useEffect, useState } from "react";

// ** Recoil Imports
import { UserState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Component Imports
import TeamPopover from "@/src/components/Popover/TeamPopover";
import CustomImage from "../../Image/CustomImage";

const DashboardHeader = () => {
  const [name, setName] = useState<string>("");
  const { nickname } = useRecoilValue(UserState);

  useEffect(() => {
    setName(nickname);
  }, [nickname]);

  return (
    <div className="h-[64px] border-b-2 border-[#EBEBEC] flex items-center justify-between">
      <Link href="/dashboard">
        <CustomImage
          src="/images/logo.png"
          width={110}
          height={30}
          alt="logo"
          className="ml-[30px]"
        />
      </Link>
      <div className="flex items-center mr-[30px]">
        <TeamPopover />
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default DashboardHeader;
