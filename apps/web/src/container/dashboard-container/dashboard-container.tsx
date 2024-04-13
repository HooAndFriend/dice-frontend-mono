// ** Component Imports
import { Dayjs } from "dayjs";
import DashboardCalendar from "./dashboard-calendar";
import DashboardCard from "./dashboard-card";
import DashboardChart from "./dashboard-chart";

// ** Type Imports
import { Dates } from "@/src/type/common";
import { WorkspaceUserCount } from "@/src/type/user";
import { TaskCount, TaskProgress } from "@/src/type/workspace";

interface PropsType {
  name: string;
  dates: Dates;
  workspaceUserCount: WorkspaceUserCount;
  doneTaskData: TaskCount;
  todayTaskData: TaskCount;
  progressData: TaskProgress;
}

const DashboardContainerView = ({
  name,
  dates,
  todayTaskData,
  doneTaskData,
  workspaceUserCount,
  progressData,
}: PropsType) => {
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
            text={`${workspaceUserCount.worksapceUserCount}명`}
            value={
              workspaceUserCount.worksapceUserCount === 0 ||
              workspaceUserCount.yesterDayworksapceUserCount === 0
                ? 0
                : ((workspaceUserCount.worksapceUserCount -
                    workspaceUserCount.yesterDayworksapceUserCount) /
                    workspaceUserCount.yesterDayworksapceUserCount) *
                  100
            }
          />
          <DashboardCard
            width="380px"
            height="215px"
            // color="#ECF6FF"
            color="#F4F4FA"
            icon="/svg/dashboard-task.svg"
            title="Today Tasks"
            text={`${todayTaskData.count}건`}
            value={
              todayTaskData.count === 0 || todayTaskData.yesterdayCount === 0
                ? 0
                : ((todayTaskData.count - todayTaskData.yesterdayCount) /
                    todayTaskData.yesterdayCount) *
                  100
            }
          />
          <DashboardCard
            width="380px"
            height="215px"
            // color="#FAEBFF"
            color="#F4F4FA"
            icon="/svg/dashboard-task-2.svg"
            title="Completed Tasks"
            text={`${doneTaskData.count}건`}
            value={
              doneTaskData.count === 0 || doneTaskData.yesterdayCount === 0
                ? 0
                : ((doneTaskData.count - doneTaskData.yesterdayCount) /
                    doneTaskData.yesterdayCount) *
                  100
            }
          />
          <DashboardCard
            width="380px"
            height="215px"
            // color="#FFEBF1"
            color="#F4F4FA"
            icon="/svg/dashboard-progress.svg"
            title="Progress"
            text={`${Math.round(progressData.todayProgress * 10) / 10}%`}
            value={Math.round(progressData.yesterdayProgress * 10) / 10}
          />
        </div>
        <div className="flex space-x-4">
          <DashboardChart />
          <DashboardCalendar />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainerView;
