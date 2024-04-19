import BoardSidebar from "@/src/components/Dashboard/BoardSidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex w-full h-full">
      <BoardSidebar />
      {children}
    </div>
  );
}
