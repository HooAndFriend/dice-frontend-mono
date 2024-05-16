// ** Component Imports
import CustomSearch from "@/src/components/Input/CustomSearch";
import UserSelectBox from "../../UserSelectBox";
import { WorkspaceUser } from "@/src/type/workspace";
import CustomSelect from "../../Input/CustomSelect";
import EpicSelectFilter from "../../Epic/EpicSelectFilter";
import { EpicStatus } from "@/src/type/epic";
import TicketStatusSelectFilter from "../TicketStatusSelectFilter";

interface PropsType {
  value: string;
  checkedList: WorkspaceUser[];
  selectEpicIds: number[];
  selectStatus: EpicStatus[];
  handleStatusSelectFilter: (status: EpicStatus) => void;
  handleEpicSelectFilter: (epicId: number) => void;
  setCheckedList: (checkedList: WorkspaceUser[]) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TicketSearchCard = ({
  value,
  selectEpicIds,
  selectStatus,
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
          selectdIds={selectEpicIds}
          handleEpicSelectFilter={handleEpicSelectFilter}
        />
        <TicketStatusSelectFilter
          selectedStatus={selectStatus}
          handleEpicSelectFilter={handleStatusSelectFilter}
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
