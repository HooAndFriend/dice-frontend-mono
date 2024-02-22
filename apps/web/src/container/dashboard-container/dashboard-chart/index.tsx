// ** Component Imports
import DashboardChartView from "./dashboard-chart";

interface PropsType {
  width?: string;
  height?: string;
}

const DashboardChart = ({ width, height }: PropsType) => {
  return <DashboardChartView width={width} height={height} />;
};

export default DashboardChart;
