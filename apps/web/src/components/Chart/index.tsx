import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartComponent = ({ options, series }) => {
  return <Chart options={options} series={series} type="line" height={350} />;
};

export default ChartComponent;
