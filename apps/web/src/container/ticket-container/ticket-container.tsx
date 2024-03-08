import TicketCard from "@/src/components/Ticket/TicketCard";
import TicketTable from "@/src/components/Ticket/TicketTable";

interface PropsType {}

const TicketContainerView = ({}: PropsType) => {
  return (
    <div className="w-full">
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">총 4건</h1>
      </div>
      <div className="flex">
        <div className="w-[65%]">
          <TicketTable />
        </div>
        <div className="w-[35%] pl-8">
          <TicketCard />
        </div>
      </div>
    </div>
  );
};

export default TicketContainerView;
