// ** Component Imports
import CustomInput from "@/src/components/Input/custom-input";
import CustomSelect from "@/src/components/Input/custom-select";
import TicketTable from "./components/ticket-table";

interface PropsType {}

const EpicContainerView = ({}: PropsType) => {
  return (
    <div className="w-calc(100% - 235px) p-5">
      <div>
        <h1 className="text-3xl font-bold">Ticket / Epic</h1>
      </div>
      <div className="mt-6 h-[180px] w-full bg-white rounded-[20px] shadow-md p-4">
        <div className="flex items-center w-full">
          <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
            Epic
          </div>
          <CustomSelect option="Epic" />
          <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
            Type
          </div>
          <CustomSelect option="Type" />
          <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
            Status
          </div>
          <CustomSelect option="Status" />
        </div>
        <div className="flex items-center w-full mt-8">
          <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
            Search
          </div>
          <CustomInput />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">총 4건</h1>
      </div>
      <TicketTable />
    </div>
  );
};

export default EpicContainerView;
