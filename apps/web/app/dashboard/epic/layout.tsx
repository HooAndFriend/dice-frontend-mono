import TicketSidebar from "@/src/components/Dashboard/ticket-sidebar";
import EpicSearchCard from "@/src/components/Epic/EpicSearchCard";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex w-full h-full">
      <TicketSidebar />
      <div className="w-full p-5 ml-235px">
        <EpicSearchCard />
        {children}
      </div>
    </div>
  );
}
