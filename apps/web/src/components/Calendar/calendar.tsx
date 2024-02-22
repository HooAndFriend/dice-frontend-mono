import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CustomCalendarView = () => {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
};
export default CustomCalendarView;
