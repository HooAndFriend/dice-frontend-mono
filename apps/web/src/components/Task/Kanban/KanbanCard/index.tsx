import { Ticket } from '@/src/type/ticket'
import TicketSettingButton from '../../Ticket/TicketSettingButton'
import TicketUserButton from '../../Ticket/TicketUserButton'
import dayjs from 'dayjs'
import CustomImage from '@/src/components/Image/CustomImage'
import TicketStatusButton from '../../Ticket/TicketStatusButton'
import TicketPriorityButton from '../../Ticket/TicketPriority'

interface PropsType {
  data: Ticket
  isClick?: boolean
  handleClick?: (id: number) => void
}

const KanbanCard = ({ data, isClick, handleClick }: PropsType) => {
  return (
    <div
      className={`mt-[12px] w-full rounded-[8px] border px-[16px] py-[12px] border-[#E1E3E8] bg-white flex flex-col justify-between ${
        isClick ? 'cursor-pointer' : ''
      }`}
      onClick={() => {
        isClick && handleClick && handleClick(data.ticketId)
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TicketSettingButton
            data={data.ticketSetting}
            contentId={data.ticketId}
            type="TICKET"
            isText={false}
          />
          <p className="text-[12px] pl-[8px]">{data.code}</p>
        </div>
        <div className="flex items-center">
          <TicketPriorityButton
            ticketId={data.ticketId}
            priortiry={data.priority}
          />
        </div>
      </div>
      <h1 className="font-bold text-[12px] mt-[16px]">{data.name}</h1>
      <div className="flex items-center space-x-4 mt-[16px]">
        <CustomImage
          width={24}
          height={24}
          src="/svg/calendar.svg"
          className=""
          alt="calendar"
        />
        <h1 className="text-[12px]">
          {data.dueDate ? dayjs(data.dueDate).format('YYYY-MM-DD') : '-'}
        </h1>
      </div>
      <div className="flex items-center justify-between mt-[24px]">
        <div className="flex items-center">
          <TicketStatusButton ticketId={data.ticketId} status={data.status} />
        </div>
        <TicketUserButton
          profile={data.worker ? data.worker.profile : '/images/dice.png'}
          nickname={data.worker ? data.worker.nickname : '-'}
          email={data.worker ? data.worker.email : '-'}
          userId={data.worker?.userId}
          type="user"
          ticketId={data.ticketId}
          isNickname={false}
        />
      </div>
    </div>
  )
}

export default KanbanCard
