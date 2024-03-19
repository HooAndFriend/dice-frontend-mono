import { EpicStatus } from "@/src/type/epic";

/**
 * Get State Box Color
 * @param state
 * @returns
 */
export const getStateBoxColor = (state: EpicStatus) => {
  switch (state) {
    case "WAITING":
      return "#FF7D34";
    case "DOING":
      return "#FFD64F";
    case "DONE":
      return "#143AE1";
    case "COMPLETE":
      return "#623AD6";
    case "HOLD":
      return "#F13333";
    case "REOPEN":
      return "#14E172";
    case "NOTHING":
      return "#565656";
    default:
      break;
  }
};
