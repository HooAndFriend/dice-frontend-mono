// ** Next Imports
import Link from 'next/link'

// ** React Imports
import { useMemo } from 'react'

// ** Type Imports
import { BoardInfo } from '@/src/type/board'

// ** Component Imports
import { usePathname } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

interface PropsType {
  board: BoardInfo
  level?: number
  handleOpen: (boardId?: number) => void
}

const BoardMenuItem = ({ board }: PropsType) => {
  const pathname = usePathname()
  const { uuid } = useRecoilValue(WorkspaceState)

  const isSelect = useMemo(
    () =>
      +pathname.split('/')[pathname.split('/').length - 1] === board.boardId,
    [pathname, board.boardId],
  )

  return (
    <div
      className={`px-[32px] ${
        isSelect && 'bg-[#F8F5FF]'
      } h-[44px] flex items-center`}
    >
      <Link href={`/${uuid}/dashboard/board/${board.boardId}`}>
        <div className={`flex items-center cursor-pointer group`}>
          <h1
            className={`text-[12px] mr-[8px] text-[${
              isSelect ? '#623AD6' : '#6A6F75'
            }]`}
          >
            #
          </h1>
          <h1
            className={`text-[12px] mr-[8px] text-[${
              isSelect ? '#623AD6' : '#6A6F75'
            }]`}
          >
            {board.title}
          </h1>
        </div>
      </Link>
    </div>
  )
}

export default BoardMenuItem
