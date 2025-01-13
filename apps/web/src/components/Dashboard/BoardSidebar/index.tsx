'use client'
// ** React Imports
import { useRef, useState } from 'react'

// ** Service Imports
import { Get } from '@/src/repository'
import useSWR from 'swr'

// ** Type Imports
import { GetBoardListResponse } from '@/src/type/board'

// ** Component Imports
import BoardMenuItem from './BoardMenuItem'
import BoardSaveModal from '../../Modal/BoardSaveModal'
import { Plus } from 'lucide-react'

const BoardSidebar = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [menuBoardId, setMenuBoardId] = useState<number | null>(null)

  const cancelButtonRef = useRef()

  const {
    data: boardData,
    isLoading,
    mutate,
  } = useSWR('/v1/board', async (url) => {
    return Get<GetBoardListResponse>(url)
  })

  const handleOpen = (boardId: number) => {
    setMenuBoardId(boardId)
    setOpen(true)
  }

  if (isLoading) return

  return (
    <aside className="w-64 overflow-y-auto bg-white shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Posts</h2>
      </div>
      <div className="p-4 border-b">
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-[10px] hover:bg-blue-600 transition-colors flex items-center justify-center"
          onClick={() => {
            handleOpen(null)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Board
        </button>
      </div>
      <div className="py-4">
        {boardData.data.data.map((board) => (
          <BoardMenuItem
            key={board.boardId}
            board={board}
            handleOpen={handleOpen}
          />
        ))}
      </div>
      {open && (
        <BoardSaveModal
          open={open}
          setOpen={setOpen}
          refetch={mutate}
          cancelButtonRef={cancelButtonRef}
          parentId={menuBoardId}
        />
      )}
    </aside>
  )
}

export default BoardSidebar
