"use client";

// ** Next Imports
import Link from "next/link";

// ** React Imports
import { useEffect, useState } from "react";

// ** Recoil Imports
import { UserState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Component Imports
import TeamPopover from "@/src/components/Popover/team-popover";

const DashboardHeader = () => {
  const [name, setName] = useState<string>("");
  const { nickname } = useRecoilValue(UserState);

  useEffect(() => {
    setName(nickname);
  }, [nickname]);

  return (
    <div className="h-[64px] border-b-2 border-[#EBEBEC] flex items-center justify-between">
      <Link href="/dashboard">
        <img
          src="/images/logo.png"
          width="110px"
          height="30px"
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
