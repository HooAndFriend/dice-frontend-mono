import TicketSidebar from "@/src/components/dashboard/ticket-sidebar";

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
