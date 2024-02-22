interface PropsType {
  width?: string;
  height?: string;
}

const DashboardChartView = ({ width, height }: PropsType) => {
  return (
    <div className="mt-6 h-[520px] w-[380px] bg-white rounded-[20px] shadow-md py-4 px-8"></div>
  );
};

export default DashboardChartView;
