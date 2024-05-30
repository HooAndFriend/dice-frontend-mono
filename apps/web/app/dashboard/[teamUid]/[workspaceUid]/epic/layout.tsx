import TicketSidebar from "@/src/components/Dashboard/TicketSidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex w-full h-full">
      <TicketSidebar />
      <div
        className="py-[30px] px-[47px] h-full"
        style={{ width: `calc(100% - 180px)` }}
      >
        {children}
      </div>
    </div>
  );
}
