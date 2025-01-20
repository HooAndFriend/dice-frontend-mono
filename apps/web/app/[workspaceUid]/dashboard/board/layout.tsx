import BoardSidebar from '@/src/components/Dashboard/BoardSidebar'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <div className="flex h-4/5 bg-gray-100">
      <BoardSidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}
