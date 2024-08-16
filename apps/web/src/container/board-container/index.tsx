// ** Next Imports
import dynamic from 'next/dynamic'

// ** Component Imports
import CustomImage from '@/src/components/Image/CustomImage'
import {OutputData} from '@editorjs/editorjs'

// ** Utils Imports
import dayjs from 'dayjs'
import {BoardDetail} from '@/src/type/board'
import ProfileBox from '@/src/components/ProfileBox'

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
  return (
    <div className='w-full h-full p-4 bg-white'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-[18px] text-gray-500'>
          {board.parent
            ? `${board.parent.title}  /  ${board.title}`
            : board.title}
        </h1>
        <div className='flex items-center'>
          <button
            className='w-[80px] rounded-[5px]  h-[30px] bg-slate-300'
            onClick={handleDelete}
          >
            DELETE
          </button>
          <button
            className='w-[80px] rounded-[5px] ml-2 h-[30px] bg-slate-300'
            onClick={readOnly ? () => setReadOnly(false) : handleSave}
          >
            {readOnly ? 'EDIT' : 'SAVE'}
          </button>
        </div>
      </div>
      <div className='mt-[24px]'>
        {readOnly ? (
          <h1 className='font-bold text-[32px]'>{board.title}</h1>
        ) : (
          <input
            type='text'
            placeholder='Enter Title'
            value={board.title}
            onChange={handleInput}
            name='title'
            className='h-[40px] w-[600px] border-none  text-[32px] px-0 my-1 font-bold'
          />
        )}
      </div>
      <div className='flex items-center ml-[8px]'>
        <ProfileBox image={board.createdUser.profile} alt='profile' />
        <div className='ml-[8px]'>
          <h1 className='text-gray-500 text-[12px] '>
            {dayjs().format('YYYY-MM-DD HH:mm:ss')}
          </h1>
        </div>
      </div>
      <div className='w-full overflow-y-hidden pt-[8px]'>
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
