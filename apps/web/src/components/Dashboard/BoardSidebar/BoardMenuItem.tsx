// ** Next Imports
import Link from 'next/link'

// ** React Imports
import { useState } from 'react'

// ** Type Imports
import { BoardInfo } from '@/src/type/board'

// ** Component Imports
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'

interface PropsType {
  board: BoardInfo
  level?: number
  handleOpen: (boardId?: number) => void
}

const BoardMenuItem = ({ board, level = 0, handleOpen }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div
        className={`flex items-center py-2 px-4 hover:bg-gray-200 cursor-pointer group`}
        style={{ paddingLeft: `${level * 20 + 16}px` }}
      >
        {board.children && (
          <button
            className="mr-2"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        <Link href={`board?boardId=${board.boardId}`}>
          <span className="flex-grow">{board.title}</span>
        </Link>
        <div className="flex items-center ml-auto transition-opacity opacity-0 group-hover:opacity-100">
          <button
            className="mr-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handleOpen(board.boardId)
            }}
            title="Add sub-item"
          >
            <Plus className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
      </div>
      {isOpen &&
        board.children &&
        board.children.map((child) => (
          <BoardMenuItem
            key={child.boardId}
            board={child}
            level={level + 1}
            handleOpen={handleOpen}
          />
        ))}
    </div>
  )
}

export default BoardMenuItem
