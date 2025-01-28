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

const BoardSidebar = () => {
  const [open, setOpen] = useState<boolean>(false)

  const cancelButtonRef = useRef()

  const {
    data: boardData,
    isLoading,
    mutate,
  } = useSWR('/v1/board', async (url) => {
    return Get<GetBoardListResponse>(url)
  })

  const handleOpen = (boardId: number) => {
    setOpen(true)
  }

  if (isLoading) return

  return (
    <aside className="w-full overflow-y-auto">
      {boardData.data.data.map((board) => (
        <BoardMenuItem
          key={board.boardId}
          board={board}
          handleOpen={handleOpen}
        />
      ))}
      <div className="px-[32px] pt-[20px]">
        <div
          className="w-full h-[36px] border-dashed rounded-[3px] border-[#CACED3] border-[1px] flex justify-center items-center cursor-pointer "
          onClick={() => setOpen(true)}
        >
          <h1 className="text-[10px] text-[#6A6F75] mr-[8px]">+</h1>
          <h1 className="text-[10px] text-[#6A6F75]">New Posts</h1>
        </div>
      </div>
      {open && (
        <BoardSaveModal
          open={open}
          setOpen={setOpen}
          refetch={mutate}
          cancelButtonRef={cancelButtonRef}
          parentId={null}
        />
      )}
    </aside>
  )
}

export default BoardSidebar
