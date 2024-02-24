import DashboardCalendar from "./dashboard-calendar";
import DashboardCard from "./dashboard-card";
import DashboardChart from "./dashboard-chart";

interface PropsType {}

const DashboardContainerView = ({}: PropsType) => {
  return (
    <div className="flex justify-center p-5">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold">HooAndFriend</h1>
          <h1 className="text-[20px] text-[#676767] pr-[64px]">
            Feb 20, 2023 ~ Sep 24, 2024
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
