// ** Next Imports
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'

// ** React Imports
import { Fragment } from 'react'

// ** Component Imports
import { ChevronRight, Clock, Edit2, Trash2 } from 'lucide-react'
import { OutputData } from '@editorjs/editorjs'
import ProfileBox from '@/src/components/ProfileBox'

// ** React Imports
import { useEffect, useState } from 'react'
import axios from 'axios'

// ** Utils Imports
<<<<<<< HEAD
import dayjs from 'dayjs'
import { BoardDetail, GetBoardResponse } from '@/src/type/board'
import ProfileBox from '@/src/components/ProfileBox'
=======

// ** Type Imports
import { BoardDetail } from '@/src/type/board'
import EditorJSViewer from '@/src/components/DiceEditor/preview'
>>>>>>> f764b6b5f5c941bed9ce2dcc1bb084ef88a64668

// ** Service Imports
import { Delete, Get, Patch, Post, Put } from '@/src/repository'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

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
  boardList: string[]
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
  boardList,
  handleInput,
  setReadOnly,
  setContent,
  handleSave,
  handleDelete,
}: PropsType) => {
  const searchParams = useSearchParams()
  const boardId = searchParams.get('boardId')
  const [boardList, setBoardList] = useState<BoardData[]>([])

  const { handleOpen } = useDialog()
  const { get } = useSearchParams()

  // 초기 데이터 로드
  const fetchBoard = async () => {
    if (!boardId) return
    try {
      const data = await Get<GetBoardResponse>(`/v1/board/${boardId}`)
      const boardContent = data.data.content
      if (typeof boardContent === 'string') {
        setContent(JSON.parse(boardContent))
      } else {
        setContent(boardContent)
      }
    } catch (error) {
      console.error('Error fetching board:', error)
      handleOpen({
        title: 'Error load board',
        message: error.message,
        logLevel: 'warn',
        buttonText: 'Close',
        type: 'alert',
      })
      setContent({ blocks: [] })
    }
  }
  fetchBoard()
  useEffect(() => {}, [boardId, setContent])

  // 게시물 저장 함수
  const saveBoard = async () => {
    try {
      if (board.boardId) {
        // 기존 게시물 수정
        await Put<CommonResponse<void>>('/v1/board', {
          boardId: Number(boardId),
          title: board.title,
          content: JSON.stringify(content),
        })
      } else {
        // 새로운 게시물 생성
        await Post<CommonResponse<void>>('/v1/board', {
          boardId: Number(boardId),
          title: board.title,
          content: JSON.stringify(content),
        })
      }
      setReadOnly(true)
      console.log('RE')
      await fetchBoard()
      //handleSave() // 원래의 저장 로직 호출
    } catch (error) {
      console.error('Error saving board:', error)
      handleOpen({
        title: 'Error content',
        message: error.response.data.message,
        logLevel: 'warn',
        buttonText: 'Close',
        type: 'alert',
      })
    }
  }

  // 제목 수정 함수
  const updateTitle = async (newTitle: string) => {
    try {
      const result = await Patch<CommonResponse<void>>('/v1/board', {
        title: newTitle,
        boardId: board.boardId,
      })
      console.log('result : ', result)
      //handleSave()
    } catch (error) {
      console.error('Error updating title:', error)
      handleOpen({
        title: 'Error title',
        message: error.response.data.message,
        logLevel: 'warn',
        buttonText: 'Close',
        type: 'alert',
      })
    }
  }

  // 게시물 삭제 함수
  const deleteBoard = async () => {
    try {
      //await Delete(`/v 1/board/${board.boardId}`)
      handleDelete() // 원래의 삭제 로직 호출
    } catch (error) {
      console.error('Error deleting board:', error)
      handleOpen({
        title: 'Error delet',
        message: error.response.data.message,
        logLevel: 'warn',
        buttonText: 'Close',
        type: 'alert',
      })
    }
  }

  return (
<<<<<<< HEAD
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
            onClick={deleteBoard}
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
            onChange={(e) => {
              handleInput(e)
              updateTitle(e.target.value)
            }}
            name="title"
            className="h-[40px] w-[600px] border-none  text-[32px] px-0 my-1 font-bold"
          />
=======
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4 text-sm text-gray-500">
        {boardList.map((board, index) =>
          boardList.length - 1 === index ? (
            <span className="font-medium text-gray-700" key={board}>
              {board}
            </span>
          ) : (
            <Fragment key={board}>
              <span>{board}</span>
              <ChevronRight className="w-4 h-4 mx-2" />
            </Fragment>
          ),
>>>>>>> f764b6b5f5c941bed9ce2dcc1bb084ef88a64668
        )}
      </div>
      <h1 className="mb-4 text-3xl font-bold">{board.title}</h1>
      <div className="flex items-center mb-6">
        <ProfileBox
          image={board.createdUser.profile}
          alt="profile"
          width={50}
          height={50}
        />
        <div>
          <p className="font-medium">{board.createdUser.nickname}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Created: {new Date(board.createdDate).toLocaleString()}</span>
            <span className="mx-2">•</span>
            <span>
              Updated: {new Date(board.modifiedDate).toLocaleString()}
            </span>
          </div>
        </div>
        {readOnly ? (
          <div className="ml-auto">
            <button
              className="px-4 py-2 mr-2 text-white transition-colors bg-blue-500 rounded-[10px] cursor-pointer hover:bg-blue-600"
              onClick={() => setReadOnly(false)}
            >
              <Edit2 className="inline-block w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              className="px-4 py-2 text-white transition-colors bg-red-500 hover:bg-red-600 rounded-[10px] cursor-pointer"
              onClick={handleDelete}
            >
              <Trash2 className="inline-block w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        ) : (
          <div className="ml-auto">
            <button
              className="px-4 py-2 text-white transition-colors bg-green-500 rounded-[10px] hover:bg-green-600"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="w-full overflow-y-hidden pt-[8px]">
        {!readOnly ? (
          <DiceEditor
            boardId={board.boardId}
            content={content}
            setContent={setContent}
            readOnly={readOnly}
          />
        ) : (
          <EditorJSViewer data={content} />
        )}
      </div>
    </div>
  )
}

export default BoardContainer
