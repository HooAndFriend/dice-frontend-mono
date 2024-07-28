"use client";

import { Get } from "@/src/repository";
import { GetBoardListResponse } from "@/src/type/board";
import useSWR from "swr";
import DashboardBoardItem from "./components/DashboardBoardItem";

interface PropsType {}

const DashboardBoard = ({}: PropsType) => {
  const { data, isLoading, mutate } = useSWR("/v1/board", async (url) => {
    return Get<GetBoardListResponse>(url);
  });

  return (
    <div className="bg-white rounded-[20px] shadow-md p-[24px]">
      <h1 className="text-2xl font-bold">Recent wiki</h1>
      <div className="grid gap-4 pt-[16px]">
        {!isLoading &&
          data.data.data.map((item) => (
            <DashboardBoardItem data={item} key={item.boardId} />
          ))}
      </div>
    </div>
  );
};

export default DashboardBoard;
