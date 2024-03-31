import TicketSidebar from "@/src/components/Dashboard/TicketSidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex w-full h-full">
      <TicketSidebar />
      <div className="w-full p-5 ml-235px">{children}</div>
    </div>
  );
}
