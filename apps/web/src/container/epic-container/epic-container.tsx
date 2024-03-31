// ** Component Imports
import EpicTable from "@/src/components/Epic/EpicTable";

// ** Type Imports
import { EpicInfo } from "@/src/type/epic";

interface PropsType {
  epicData: EpicInfo[];
  epicCount: number;
}

const EpicContainerView = ({ epicData, epicCount }: PropsType) => {
  return (
    <div className="w-full">
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">Total Ticket : {epicCount}</h1>
      </div>
      <EpicTable epicData={epicData} />
    </div>
  );
};

export default EpicContainerView;
