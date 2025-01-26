// ** Type Imports
import { TicketInfo } from '@/src/type/ticket'

// ** Component Imports
import TicketStatusButton from '../TicketStatusButton'
import TicketSettingButton from '../TicketSettingButton'
import TicketUserButton from '../TicketUserButton'

interface PropsType {
  data: TicketInfo
  handleClick?: (id: number) => void
}

const TicketKanbanCard = ({ data, handleClick }: PropsType) => {
  return (
    <div
      className="w-full h-[157px] shadow-xl rounded-[15px] bg-white p-[20px] cursor-pointer mb-[25px]"
      onClick={() => handleClick(data.ticketId)}
    >
      <div className="mt-[15px] mb-[25px]">
        <TicketStatusButton status={data.status} ticketId={data.ticketId} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TicketSettingButton
            data={data.ticketSetting}
            contentId={data.ticketId}
            type="TICKET"
            isText={false}
          />
          <h1 className="text-[16px] ml-[10px]">{`${data.code} ${data.name}`}</h1>
        </div>
        <TicketUserButton
          profile={data.worker?.profile}
          nickname={data.worker?.nickname}
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

export default TicketKanbanCard
