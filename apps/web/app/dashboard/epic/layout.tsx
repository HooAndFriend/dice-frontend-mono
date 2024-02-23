import TicketSidebar from "@/src/components/Dashboard/ticket-sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-1 h-full">
      <TicketSidebar />
      {children}
    </div>
  );
}
