// ** Component Imports
import DashboardCardView from "./dashboard-card";

interface PropsType {
  width?: string;
  height?: string;
  color: string;
  icon: string;
  title: string;
  text: string;
  value: number;
}

const DashboardCard = ({
  width,
  height,
  color,
  icon,
  title,
  text,
  value,
}: PropsType) => {
  return (
    <DashboardCardView
      width={width}
      height={height}
      color={color}
      icon={icon}
      title={title}
      text={text}
      value={value}
    />
  );
};

export default DashboardCard;
