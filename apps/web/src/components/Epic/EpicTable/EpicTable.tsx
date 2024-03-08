// ** Component Imports
import EpicItem from "../EpicItem";
import EpicAddItem from "../EpicAddItem";

// ** Type Imports
import { EpicInfo } from "@/src/type/epic";

interface PropsType {
  epicData: EpicInfo[];
}

const EpicTableView = ({ epicData }: PropsType) => {
  return (
    <div className="mt-6 h-[530px] overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
      {epicData.map((item) => (
        <EpicItem key={item.id} item={item} />
      ))}
      <EpicAddItem />
    </div>
  );
};

export default EpicTableView;
