// ** Next Imports
import Link from "next/link";

// ** Component Imports
import TeamPopover from "@/src/components/Popover/team-popover";

interface PropsType {
  name: string;
}

const DashboardHeaderView = ({ name }: PropsType) => {
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

export default DashboardHeaderView;
