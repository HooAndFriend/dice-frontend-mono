// ** Component Imports
import { WorkspaceState } from "@/src/app";
import EpicItem from "../EpicItem";

// ** Type Imports
import { EpicInfo, SelectContent } from "@/src/type/epic";

// ** Utils Imports
import { useRecoilValue } from "recoil";
import EpicAddItem from "../EpicAddItem";

interface PropsType {
  epicData: EpicInfo[];
  handleClick: (value: SelectContent) => void;
}

const EpicTable = ({ epicData, handleClick }: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState);

  return (
    <div className="w-full h-full bg-white rounded-[8px] scrollbar-thumb-slate-700 scrollbar-track-slate-300">
      <div className="relative w-full h-full overflow-y-scroll scrollbar-thin">
        <div className="w-full h-full ">
          <table className="w-full text-sm caption-bottom">
            <tbody className="[&amp;_tr:last-child]:border-0">
              {epicData.map((item) => (
                <EpicItem
                  key={item.epicId}
                  item={item}
                  word=""
                  handleClick={handleClick}
                />
              ))}
              {role !== "VIEWER" && <EpicAddItem />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EpicTable;
