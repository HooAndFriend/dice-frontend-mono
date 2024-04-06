// ** Custom Components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// ** Style Imports
import "./caleander.css";

interface PropsType {
  event: { title: string; date: string }[];
}

const CustomCalendar = ({ event }: PropsType) => {
  return (
    <FullCalendar
      headerToolbar={{
        start: "",
        center: "prev title next",
        end: "",
      }}
      events={event}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
    />
  );
};

export default CustomCalendar;
