'use client'

import { Get } from '@/src/repository'
import { GetBoardListResponse } from '@/src/type/board'
import useSWR from 'swr'
import DashboardBoardItem from './components/DashboardBoardItem'
import Image from 'next/image'

interface PropsType {}

const DashboardBoard = ({}: PropsType) => {
  const { data, isLoading, mutate } = useSWR(
    '/v1/board/simple',
    async (url) => {
      return Get<GetBoardListResponse>(url)
    },
  )

  return (
    <div className="bg-white rounded-[20px] shadow-md p-[24px] lg:col-span-1 flex-1">
      <h1 className="text-2xl font-bold">Recent wiki</h1>
      <div className="grid gap-4 pt-[16px]">
        {!isLoading && data.data.data.length > 0 ? (
          data.data.data.map((item) => (
            <DashboardBoardItem data={item} key={item.boardId} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <Image
              src="/images/no_board.jpeg"
              width={200}
              height={200}
              alt="No Data UI"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardBoard
