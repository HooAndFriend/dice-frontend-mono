// ** Component Imports
import EpicTableView from "./EpicTable";

// ** Type Imports
import { EpicInfo } from "@/src/type/epic";

interface PropsType {
  epicData: EpicInfo[];
}

const EpicTable = ({ epicData }: PropsType) => {
  return <EpicTableView epicData={epicData} />;
};
export default EpicTable;
