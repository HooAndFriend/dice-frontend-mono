import { TicketInfo } from '@/src/type/ticket'
import TicketSettingButton from '../TicketSettingButton'
import TicketStatusButton from '../TicketStatusButton'
import TicketUserButton from '../TicketUserButton'

interface PropsType {
  ticket: TicketInfo
}

const SubTicketItem = ({ ticket }: PropsType) => {
  return (
    <div className="w-full h-[50px] rounded-[5px] shadow grid grid-cols-2 items-center px-[12px]">
      <div className="flex items-center">
        <TicketSettingButton data={ticket} isText={false} />
        <p
          className="pl-[6px] text-[14px]"
          style={{
            textDecorationLine:
              ticket.status === 'COMPLETE' ? 'line-through' : 'none',
          }}
        >
          {`${ticket.code} - ${ticket.name}`}
        </p>
      </div>

      <div className="flex items-center justify-end">
        <TicketUserButton
          profile={ticket.worker ? ticket.worker.profile : '/images/dice.png'}
          nickname={ticket.worker ? ticket.worker.nickname : '-'}
          email={ticket.worker ? ticket.worker.email : '-'}
          userId={ticket.worker?.userId}
          type="user"
          ticketId={ticket.ticketId}
          isNickname={false}
        />
        <TicketStatusButton ticketId={ticket.ticketId} status={ticket.status} />
      </div>
    </div>
  )
}
export default SubTicketItem
