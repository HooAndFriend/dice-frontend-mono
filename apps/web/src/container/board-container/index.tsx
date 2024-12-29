// ** Next Imports
import dynamic from 'next/dynamic'

// ** Component Imports
import CustomImage from '@/src/components/Image/CustomImage'
import { OutputData } from '@editorjs/editorjs'

// ** Utils Imports
import dayjs from 'dayjs'
import { BoardDetail } from '@/src/type/board'
import ProfileBox from '@/src/components/ProfileBox'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'

interface BoardData {
  boardId: number
  title: string
  content: OutputData
  createdAt: string
}

interface PropsType {
  content: OutputData
  readOnly: boolean
  board: BoardDetail
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  setReadOnly: (readOnly: boolean) => void
  handleSave: () => void
  handleDelete: () => void
  setContent: (content: OutputData) => void
}

const DiceEditor = dynamic(() => import('@/src/components/DiceEditor'), {
  ssr: false,
})

const BoardContainer = ({
  content,
  readOnly,
  board,
  handleInput,
  setReadOnly,
  setContent,
  handleSave,
  handleDelete,
}: PropsType) => {
  const searchParams = useSearchParams()
  const boardId = searchParams.get('boardId')
  const [boardList, setBoardList] = useState<BoardData[]>([])

  // 초기 데이터 로드
  useEffect(() => {
    const savedList = localStorage.getItem('boardList')
    if (savedList) {
      setBoardList(JSON.parse(savedList))
    }
  }, [])

  useEffect(() => {
    if (!boardId) return

    const savedContent = localStorage.getItem(`board-${boardId}`)
    if (savedContent) {
      setContent(JSON.parse(savedContent))
    } else {
      setContent({ blocks: [] }) // 데이터가 없을 경우 빈 상태로 초기화
    }
  }, [boardId, setContent])

  // 게시물 저장 함수
  const saveBoard = () => {
    const updatedBoard: BoardData = {
      boardId: board.boardId || Date.now(), // 고유 ID 생성
      title: board.title,
      content,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }

    const updatedList = boardList.some(
      (item) => item.boardId === updatedBoard.boardId,
    )
      ? boardList.map((item) =>
          item.boardId === updatedBoard.boardId ? updatedBoard : item,
        ) // 기존 게시물 수정
      : [...boardList, updatedBoard] // 새로운 게시물 추가

    setBoardList(updatedList)
    localStorage.setItem('boardList', JSON.stringify(updatedList)) // 로컬 저장소에 저장
    localStorage.setItem(
      `board-${board.boardId}`,
      JSON.stringify(updatedBoard.content),
    ) // 개별 콘텐츠 저장
    handleSave() // 원래의 저장 로직 호출
  }
  return (
    <div className="w-full h-full p-4 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[18px] text-gray-500">
          {board.parent
            ? `${board.parent.title}  /${board.title}`
            : board.title}
        </h1>
        <div className="flex items-center">
          <button
            className="w-[80px] rounded-[5px]  h-[30px] bg-slate-300"
            onClick={handleDelete}
          >
            DELETE
          </button>
          <button
            className="w-[80px] rounded-[5px] ml-2 h-[30px] bg-slate-300"
            onClick={readOnly ? () => setReadOnly(false) : saveBoard}
          >
            {readOnly ? 'EDIT' : 'SAVE'}
          </button>
        </div>
      </div>
      <div className="mt-[24px]">
        {readOnly ? (
          <h1 className="font-bold text-[32px]">{board.title}</h1>
        ) : (
          <input
            type="text"
            placeholder="Enter Title"
            value={board.title}
            onChange={handleInput}
            name="title"
            className="h-[40px] w-[600px] border-none  text-[32px] px-0 my-1 font-bold"
          />
        )}
      </div>
      <div className="flex items-center ml-[8px]">
        <ProfileBox image={board.createdUser.profile} alt="profile" />
        <div className="ml-[8px]">
          <h1 className="text-gray-500 text-[12px] ">
            {dayjs().format('YYYY-MM-DD HH:mm:ss')}
          </h1>
        </div>
      </div>
      <div className="w-full overflow-y-hidden pt-[8px]">
        <DiceEditor
          boardId={board.boardId}
          content={content}
          setContent={setContent}
          readOnly={readOnly}
        />
      </div>
    </div>
  )
}

export default BoardContainer
