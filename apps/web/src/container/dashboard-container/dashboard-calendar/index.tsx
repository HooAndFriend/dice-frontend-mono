// ** Component Imports
import CustomCalendar from "@/src/components/Calendar";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetDateTaskListResponse } from "@/src/type/workspace";

// ** Utils Imports
import dayjs from "dayjs";

const DashboardCalendar = () => {
  const { data, isLoading } = useSWR("/v1/workspace/task/calendar", (url) =>
    Get<GetDateTaskListResponse>(url, {
      params: { date: dayjs().startOf("month").format("YYYY-MM") },
    })
  );

  if (isLoading) return;

  return (
    <div
      className={`mt-6 h-[720px] w-[1170px] bg-white rounded-[20px] shadow-md py-4 px-8 overflow-scroll`}
    >
      <CustomCalendar
        event={data.data.data.map((item) => ({
          title: item.name,
          date: dayjs(item.dueDate).format("YYYY-MM-DD"),
        }))}
      />
    </div>
  );
};

export default DashboardCalendar;
