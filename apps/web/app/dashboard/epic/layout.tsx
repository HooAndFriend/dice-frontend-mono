import TicketSidebar from "@/src/components/Dashboard/ticket-sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex w-full h-full">
      <TicketSidebar />
      {children}
    </div>
  );
}
