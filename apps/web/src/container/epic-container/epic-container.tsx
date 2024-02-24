"use client";

// ** Component Imports
import TicketTable from "./components/TicketTable";

interface PropsType {}

const EpicContainerView = ({}: PropsType) => {
  return (
    <div className="w-full">
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">총 4건</h1>
      </div>
      <TicketTable />
    </div>
  );
};

export default EpicContainerView;
