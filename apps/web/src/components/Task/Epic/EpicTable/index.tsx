// ** Component Imports
import EpicItem from "../EpicItem";

// ** Type Imports
import { EpicInfo, SelectContent } from "@/src/type/epic";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

interface PropsType {
  epicData: EpicInfo[];
  word: string;
  handleClick: (value: SelectContent) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const EpicTable = ({ epicData, word, onDragEnd, handleClick }: PropsType) => {
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
                  handleClick={() => {}}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EpicTable;
