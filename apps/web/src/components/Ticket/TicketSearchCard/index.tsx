// ** Component Imports
import CustomSearch from "@/src/components/Input/CustomSearch";
import UserSelectBox from "../../UserSelectBox";
import { WorkspaceUser } from "@/src/type/workspace";

interface PropsType {
  value: string;
  checkedList: WorkspaceUser[];
  setCheckedList: (checkedList: WorkspaceUser[]) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TicketSearchCard = ({
  value,
  onChange,
  checkedList,
  setCheckedList,
}: PropsType) => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Ticket / Ticket</h1>
      </div>
      <div className="mt-6 h-[90px] w-full bg-white rounded-[20px] shadow-md p-4 flex items-center">
        <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
          Search
        </div>
        <CustomSearch value={value} onChange={onChange} />
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
