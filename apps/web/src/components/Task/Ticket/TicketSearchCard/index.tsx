// ** Component Imports
import CustomSearch from "@/src/components/Input/CustomSearch";
import UserSelectBox from "../../../UserSelectBox";
import { WorkspaceUser } from "@/src/type/workspace";
import { EpicStatus } from "@/src/type/epic";
import TicketStatusSelectFilter from "../../Common/Filter/StatusFilter";
import TicketTypeSelectFilter from "../../Common/Filter/TypeFilter";

interface PropsType {
  value: string;
  checkedList: WorkspaceUser[];
  selectedEpicIds: number[];
  selectedStatus: EpicStatus[];
  selectedTypeIds: number[];
  handleTypeSelectFilter: (typeId: number) => void;
  handleStatusSelectFilter: (status: EpicStatus) => void;
  handleEpicSelectFilter: (epicId: number) => void;
  setCheckedList: (checkedList: WorkspaceUser[]) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TicketSearchCard = ({
  value,
  selectedEpicIds,
  selectedStatus,
  selectedTypeIds,
  handleTypeSelectFilter,
  handleStatusSelectFilter,
  handleEpicSelectFilter,
  onChange,
  checkedList,
  setCheckedList,
}: PropsType) => {
  return (
    <div>
      <div className="mt-6 h-[90px] w-full bg-white rounded-[20px] shadow-md p-4 flex items-center">
        <CustomSearch value={value} onChange={onChange} />
        <div className="ml-[10px]">
          <TicketStatusSelectFilter
            selectedStatus={selectedStatus}
            handleEpicSelectFilter={handleStatusSelectFilter}
          />
        </div>
        <div className="ml-[10px]">
          <TicketTypeSelectFilter
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

export default TicketSearchCard;
