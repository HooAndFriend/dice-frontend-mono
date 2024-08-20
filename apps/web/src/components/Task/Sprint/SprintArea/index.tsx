import { Ticket } from '@/src/type/ticket'
import dayjs from 'dayjs'
import { useState } from 'react'
import TicketTable from '../../Ticket/TicketTable'

interface PropsType {
  data: Ticket[]
}

const SprintArea = ({ data }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="w-full bg-white border  rounded-[12px]">
      <div className="w-full h-[50px] flex items-center px-[12px] space-x-4">
        <h1 className="cursor-pointer " onClick={() => setOpen((cur) => !cur)}>
          {'>'}
        </h1>
        <h1>스프린트 1</h1>
        <h1>
          {dayjs().format('YYYY-MM-DD')} - {dayjs().format('YYYY-MM-DD')}
        </h1>
        <h1>({data.length}개 이슈)</h1>
      </div>
      {open && (
        <div className="w-full h-full pb-[12px]">
          <TicketTable handleClick={() => {}} data={data} />
        </div>
      )}
    </div>
  )
}

export default SprintArea
