// ** Component Imports
import CustomSearch from "@/src/components/Input/CustomSearch";
import UserSelectBox from "../../../UserSelectBox";
import { WorkspaceUser } from "@/src/type/workspace";
import CustomSelect from "../../../Input/CustomSelect";
import EpicSelectFilter from "../../Common/Filter/EpicFilter";
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
        <EpicSelectFilter
          selectdIds={selectedEpicIds}
          handleEpicSelectFilter={handleEpicSelectFilter}
        />
        <TicketStatusSelectFilter
          selectedStatus={selectedStatus}
          handleEpicSelectFilter={handleStatusSelectFilter}
        />
        <TicketTypeSelectFilter
          selectedTypeIds={selectedTypeIds}
          handleTypeSelectFilter={handleTypeSelectFilter}
        />
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
