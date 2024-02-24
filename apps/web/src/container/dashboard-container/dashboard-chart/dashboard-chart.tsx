import DounetChart from "@/src/components/Chart/DounetChart";
import ChartItem from "./components/ChartItem";

interface PropsType {
  width?: string;
  height?: string;
}

const DashboardChartView = ({ width, height }: PropsType) => {
  return (
    <div className="mt-6 h-[520px] w-[380px] bg-white rounded-[20px] shadow-md py-4 px-8">
      <div className="w-full">
        <h1 className="text-[32px] font-bold">My Task</h1>
      </div>
      <div className="flex items-center justify-center w-full mt-4">
        <DounetChart
          width="280px"
          height="280px"
          status="completed"
          value={25}
        />
      </div>
      <hr className="my-4" />
      <ChartItem id="DICE-001" name="회원가입" status="DOING" />
      <ChartItem id="DICE-002" name="로그인" status="DOING" />
      <ChartItem id="DICE-003" name="아이디 찾기" status="DONE" />
    </div>
  );
};

export default DashboardChartView;
