// ** Component Imports
import CustomSearch from "@/src/components/Input/CustomSearch";

interface PropsType {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EpicSearchCard = ({ value, onChange }: PropsType) => {
  return (
    <div>
      <div className="mt-6 h-[90px] w-full bg-white rounded-[20px] shadow-md p-4 flex items-center">
        <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
          Search
        </div>
        <CustomSearch value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default EpicSearchCard;
