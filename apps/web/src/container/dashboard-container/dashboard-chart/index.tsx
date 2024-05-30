// ** Component Imports
import DounetChart from "@/src/components/Chart/DounetChart";
import ChartItem from "./components/ChartItem";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetTaskListResponse } from "@/src/type/workspace";
import { useMemo } from "react";

const DashboardChart = () => {
  const { data, isLoading } = useSWR("/v1/workspace/task", (url) =>
    Get<GetTaskListResponse>(url)
  );

  const progress = useMemo(() => {
    if (isLoading) return 0;

    const total = data.data.data.length;
    const completed = data.data.data.filter(
      (item) => item.status === "COMPLETE"
    ).length;

    return (completed / total) * 100;
  }, [data]);
  if (isLoading) return;

  return (
    <div className="mt-6 h-[564px] w-[380px] bg-white rounded-[20px] shadow-md py-4 px-8 overflow-y-auto overflow-x-hidden">
      <div className="w-full">
        <h1 className="text-[32px] font-bold">My Task</h1>
      </div>
      <div className="flex items-center justify-center w-full mt-4">
        <DounetChart
          width="280px"
          height="280px"
          status="completed"
          value={progress}
        />
      </div>
      <hr className="my-4" />
      {!isLoading &&
        data.data.data.map((item, index) => (
          <ChartItem
            id={item.code}
            name={item.title}
            status={item.status}
            key={index}
          />
        ))}
    </div>
  );
};

export default DashboardChart;
