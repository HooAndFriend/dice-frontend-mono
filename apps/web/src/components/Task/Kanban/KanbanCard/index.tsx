import { Ticket } from '@/src/type/ticket'
import TicketSettingButton from '../../Ticket/TicketSettingButton'
import TicketUserButton from '../../Ticket/TicketUserButton'
import dayjs from 'dayjs'
import CustomImage from '@/src/components/Image/CustomImage'

interface PropsType {
  data: Ticket
}

const KanbanCard = ({ data }: PropsType) => {
  return (
    <div className="mt-[12px] w-full rounded-[8px] border px-[16px] py-[12px] border-[#E1E3E8] bg-white flex flex-col justify-between">
      <h1 className="font-bold text-[16px]">{data.name}</h1>
      <p className="text-[12px] text-gray-400 my-[8px]">
        Details about this item can go here but are truncated after a certain
        length.
      </p>
      <div className="my-[8px] flex items-center space-x-4">
        <CustomImage
          width={24}
          height={24}
          src="/svg/calendar.svg"
          className=""
          alt="calendar"
        />
        <h1>{data.dueDate ? dayjs(data.dueDate).format('YYYY-MM-DD') : '-'}</h1>
      </div>
      <div className="flex items-center justify-between mt-[24px]">
        <div className="flex items-center justify-between">
          <TicketSettingButton data={data} isText={false} />
          <p className="text-[12px] pl-[8px]">{data.code}</p>
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
