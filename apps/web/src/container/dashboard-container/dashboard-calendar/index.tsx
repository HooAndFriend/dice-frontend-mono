// ** Component Imports
import DashboardCalendarView from "./dashboard-calendar";

interface PropsType {
  width?: string;
  height?: string;
}

const DashboardCalendar = ({ width, height }: PropsType) => {
  return <DashboardCalendarView width={width} height={height} />;
};

export default DashboardCalendar;
