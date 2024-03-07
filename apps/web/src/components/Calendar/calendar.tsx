import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./caleander.css";

const CustomCalendarView = () => {
  return (
    <FullCalendar
      headerToolbar={{
        start: "",
        center: "prev title next",
        end: "",
      }}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
    />
  );
};
export default CustomCalendarView;
