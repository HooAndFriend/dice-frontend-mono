import BoardSidebar from '@/src/components/Dashboard/BoardSidebar'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100">
      <BoardSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
        {/* {selectedPost ? (
          <PostContent post={selectedPost} />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl text-gray-500">
            Select a post to view
          </div>
        )} */}
      </main>
    </div>
  )
  // return (
  //   <div className="flex w-full h-full">
  //     <BoardSidebar />
  //     <div className="" style={{ width: `calc(100% - 300px)` }}>
  //       {children}
  //     </div>
  //   </div>
  // )
}
