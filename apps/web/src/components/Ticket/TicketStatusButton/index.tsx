import { TicketStatus } from "@/src/type/component";

interface PropsType {
  status: TicketStatus;
  width?: string;
  height?: string;
  borderRadius?: string;
}

const getButtonColor = (status: TicketStatus) => {
  switch (status) {
    case "REOPEN":
      return "bg-[#FFDBD5]";
    case "FINISH":
      return "bg-[#CAE0F4]";
    case "DOING":
      return "bg-[#F7E5A9]";
    default:
      return "bg-black";
  }
};

const getTextColor = (status: TicketStatus) => {
  switch (status) {
    case "REOPEN":
      return "text-[#F13333]";
    case "FINISH":
      return "text-[#143AE1]";
    case "DOING":
      return "text-[#977C23]";
    default:
      return "text-black";
  }
};

const TicketStatusButton = ({
  status,
  width = "85px",
  height = "30px",
  borderRadius = "6px",
}: PropsType) => {
  return (
    <button
      className={`${getButtonColor(status)} ${getTextColor(
        status,
      )} w-[${width}] h-[${height}] rounded-[${borderRadius}]`}
    >
      {status}
    </button>
  );
};

export default TicketStatusButton;
