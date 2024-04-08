// ** Component Imports
import EpicTable from "@/src/container/epic-container/components/EpicTable";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

// ** Type Imports
import { EpicInfo } from "@/src/type/epic";
import EpicSearchCard from "./components/EpicSearchCard";

interface PropsType {
  word: string;
  epicData: EpicInfo[];
  epicCount: number;
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const EpicContainerView = ({
  epicData,
  epicCount,
  word,
  handleWord,
  onDragEnd,
}: PropsType) => {
  return (
    <div className="w-full">
      <EpicSearchCard value={word} onChange={handleWord} />
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">Total Epic : {epicCount}</h1>
      </div>
      <EpicTable
        epicData={epicData.filter((item) => item.name.includes(word))}
        onDragEnd={onDragEnd}
      />
    </div>
  );
};

export default EpicContainerView;
