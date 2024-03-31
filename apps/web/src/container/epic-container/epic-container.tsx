// ** Component Imports
import EpicTable from "@/src/container/epic-container/components/EpicTable";

// ** Type Imports
import { EpicInfo } from "@/src/type/epic";
import EpicSearchCard from "./components/EpicSearchCard";

interface PropsType {
  word: string;
  epicData: EpicInfo[];
  epicCount: number;
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EpicContainerView = ({
  epicData,
  epicCount,
  word,
  handleWord,
}: PropsType) => {
  return (
    <div className="w-full">
      <EpicSearchCard value={word} onChange={handleWord} />
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">Total Ticket : {epicCount}</h1>
      </div>
      <EpicTable
        epicData={epicData.filter((item) => item.name.includes(word))}
      />
    </div>
  );
};

export default EpicContainerView;
