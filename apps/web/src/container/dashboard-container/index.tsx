import DashboardCard from "@/src/components/Dashboard/DashboardCard";
import DashboardBoard from "@/src/components/Dashboard/DashboardBoard";
import DashboardTask from "@/src/components/Dashboard/DashboardTask";

const DashboardContainer = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FAFAFB] px-4 py-6">
      <div className="flex flex-col gap-6">
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
          style={{ flex: "1" }}
        >
          <DashboardCard
            width="380px"
            color="#F4F4FA"
            icon="/svg/dashboard-task.svg"
            title="Today Tasks"
            text={"3건(66%)"}
            value={100}
          />
          <DashboardCard
            width="380px"
            color="#F4F4FA"
            icon="/svg/dashboard-user.svg"
            title="Review Tasks"
            text={"0건"}
            value={100}
          />
          <DashboardCard
            width="380px"
            color="#F4F4FA"
            icon="/svg/dashboard-progress.svg"
            title="Sprint Progress"
            text={"0건"}
            value={100}
          />
          <DashboardCard
            width="380px"
            color="#F4F4FA"
            icon="/svg/dashboard-task-2.svg"
            title="Completed Tasks"
            text={"0건"}
            value={100}
          />
          <DashboardCard
            width="380px"
            color="#F4F4FA"
            icon="/svg/dashboard-progress.svg"
            title="Progress"
            text={"0건"}
            value={100}
          />
        </div>

        {/* 이 부분이 2/3 높이를 차지 */}
        <div className="grid flex-1 gap-6 lg:grid-cols-3" style={{ flex: "2" }}>
          <div className="flex flex-col lg:col-span-2">
            <DashboardTask />
          </div>
          <div className="flex flex-col lg:col-span-1">
            <DashboardBoard />
          </div>
        </div>
        <div className="grid flex-1 gap-6 lg:grid-cols-3" style={{ flex: "2" }}>
          <div className="flex flex-col lg:col-span-1">
            <DashboardBoard />
          </div>
          <div className="flex flex-col lg:col-span-2">
            <DashboardTask />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
