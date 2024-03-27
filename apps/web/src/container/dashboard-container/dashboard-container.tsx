// ** Component Imports
import { Dayjs } from "dayjs";
import DashboardCalendar from "./dashboard-calendar";
import DashboardCard from "./dashboard-card";
import DashboardChart from "./dashboard-chart";

// ** Type Imports
import { Dates } from "@/src/type/common";

interface PropsType {
  name: string;
  dates: Dates;
}

const getDateString = (date: Dayjs) => {};

const DashboardContainerView = ({ name, dates }: PropsType) => {
  return (
    <div className="flex justify-center p-5">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold">{name}</h1>
          <h1 className="text-[20px] text-[#676767]">
            {`${dates.startDate.format(
              "MMM DD, YYYY"
            )} ~ ${dates.endDate.format("MMM DD, YYYY")}`}
          </h1>
        </div>
        <div className="flex space-x-4">
          <DashboardCard
            width="380px"
            height="215px"
            color="#F4F4FA"
            icon="/svg/dashboard-user.svg"
            title="Member"
            text="25명"
            value={10}
          />
          <DashboardCard
            width="380px"
            height="215px"
            // color="#ECF6FF"
            color="#F4F4FA"
            icon="/svg/dashboard-task.svg"
            title="Total Tasks"
            text="25건"
            value={-20}
          />
          <DashboardCard
            width="380px"
            height="215px"
            // color="#FAEBFF"
            color="#F4F4FA"
            icon="/svg/dashboard-task-2.svg"
            title="Compoleted Tasks"
            text="25건"
            value={40}
          />
          <DashboardCard
            width="380px"
            height="215px"
            // color="#FFEBF1"
            color="#F4F4FA"
            icon="/svg/dashboard-progress.svg"
            title="Progress"
            text="75%"
            value={-40}
          />
        </div>
        <div className="flex space-x-4">
          <DashboardChart />
          <DashboardCalendar width="1140px" height="400px" />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainerView;
