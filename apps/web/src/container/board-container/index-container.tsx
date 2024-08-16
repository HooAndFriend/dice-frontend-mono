// ** Next Imports
import Link from 'next/link'

// ** Component Imports
import CustomImage from '@/src/components/Image/CustomImage'

// ** Service Imports
import {Get} from '@/src/repository'
import useSWR from 'swr'

// ** Type Imports
import {GetBoardListResponse} from '@/src/type/board'

// ** Utils Imports
import dayjs from 'dayjs'
import {useRecoilValue} from 'recoil'
import {WorkspaceState} from '@/src/app'

interface PropsType {}

const IndexContainerView = ({}: PropsType) => {
  const {
    data: boardData,
    isLoading,
    mutate,
  } = useSWR('/v1/board', async url => {
    return Get<GetBoardListResponse>(url)
  })

  return (
    <div className='w-full h-full p-4 bg-white'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-[18px]'>HI-DICE / BOARD</h1>
      </div>
      <div className='flex items-center mt-4'>
        <CustomImage
          src={'/images/dice.png'}
          width={30}
          height={30}
          alt='profile'
        />
        <div className='ml-4'>
          <h1 className='text-[14px]'>HI-DICE</h1>
          <h1 className='text-gray-500 text-[12px]'>
            {dayjs().format('YYYY-MM-DD HH:mm:ss')}
          </h1>
        </div>
      </div>
      <div className='w-full mt-12 overflow-y-hidden'>
        {!isLoading &&
          boardData.data.data.map(item => (
            <Link href={`board?boardId=${item.boardId}`} key={item.boardId}>
              <li className='w-full p-2 hover:bg-red-200'>{item.title}</li>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default IndexContainerView
