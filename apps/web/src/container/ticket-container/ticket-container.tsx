import TicketCard from "@/src/components/Ticket/TicketCard";
import TicketTable from "@/src/components/Ticket/TicketTable";

interface PropsType {
  ticketId: number;
  setTicketId: (id: number) => void;
}

const TicketContainerView = ({ ticketId, setTicketId }: PropsType) => {
  return (
    <div className="w-full">
      <div className="mt-8">
        <h1 className="pl-4 font-bold text-md">총 4건</h1>
      </div>
      <div className={`${ticketId !== 0 && "flex"}`}>
        <div className={`w-[${ticketId === 0 ? "100%" : "65%"}]`}>
          <TicketTable handleClick={setTicketId} />
        </div>
        {ticketId !== 0 && (
          <div className="w-[35%] pl-8">
            <TicketCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketContainerView;
