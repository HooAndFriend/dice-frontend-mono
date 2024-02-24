import CustomCalendar from "@/src/components/Calendar";

interface PropsType {
  width?: string;
  height?: string;
}

const DashboardCalendarView = ({ width, height }: PropsType) => {
  return (
    <div
      className={`mt-6 h-[720px] w-[1170px] bg-white rounded-[20px] shadow-md py-4 px-8 overflow-scroll`}
    >
      <CustomCalendar />
    </div>
  );
};

export default DashboardCalendarView;
