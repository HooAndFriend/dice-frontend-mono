// ** Component Imports
import TypeFilter from "../../Common/Filter/TypeFilter";
import StatusFilter from "../../Common/Filter/StatusFilter";
import CustomSearch from "@/src/components/Input/CustomSearch";
import UserSelectBox from "@/src/components/UserSelectBox";

// ** Type Imports
import { EpicStatus } from "@/src/type/epic";
import { WorkspaceUser } from "@/src/type/workspace";

interface PropsType {
  word: string;
  checkedList: WorkspaceUser[];
  selectedStatus: EpicStatus[];
  selectedTypeIds: number[];
  handleTypeSelectFilter: (typeId: number) => void;
  handleStatusSelectFilter: (status: EpicStatus) => void;
  setCheckedList: (checkedList: WorkspaceUser[]) => void;
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EpicSearchCard = ({
  word,
  checkedList,
  selectedStatus,
  selectedTypeIds,
  setCheckedList,
  handleWord,
  handleTypeSelectFilter,
  handleStatusSelectFilter,
}: PropsType) => {
  return (
    <div>
      <div className="mt-6 h-[90px] w-full bg-white rounded-[20px] shadow-md p-4 flex items-center">
        <CustomSearch value={word} onChange={handleWord} />
        <div className="ml-[10px]">
          <StatusFilter
            selectedStatus={selectedStatus}
            handleEpicSelectFilter={handleStatusSelectFilter}
          />
        </div>
        <div className="ml-[10px]">
          <TypeFilter
            selectedTypeIds={selectedTypeIds}
            handleTypeSelectFilter={handleTypeSelectFilter}
          />
        </div>
        <div className="ml-8">
          <UserSelectBox
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
      </div>
    </div>
  );
};

export default EpicSearchCard;
