// ** Next Imports
import dynamic from 'next/dynamic'

// ** React Imports
import { Fragment } from 'react'

// ** Component Imports
import { ChevronRight, Clock, Edit2, Trash2 } from 'lucide-react'
import { OutputData } from '@editorjs/editorjs'
import ProfileBox from '@/src/components/ProfileBox'

// ** Utils Imports

// ** Type Imports
import { BoardDetail } from '@/src/type/board'
import EditorJSViewer from '@/src/components/DiceEditor/preview'

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
  return (
    <div className="p-6 h-full bg-white rounded-lg shadow-md">
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
