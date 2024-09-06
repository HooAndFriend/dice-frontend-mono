// ** Next Imports
import { useRouter } from 'next/navigation'

// ** Type Imports
import { TicketInfo } from '@/src/type/ticket'

// ** Component Imports
import TicketSettingButton from '../TicketSettingButton'
import TicketStatusButton from '../TicketStatusButton'
import TicketUserButton from '../TicketUserButton'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

interface PropsType {
  ticket: TicketInfo
}

const SubTicketItem = ({ ticket }: PropsType) => {
  const router = useRouter()
  const { uuid } = useRecoilValue(WorkspaceState)
  return (
    <div
      className="w-full h-[50px] rounded-[5px] shadow grid grid-cols-2 items-center px-[12px] cursor-pointer"
      onClick={() =>
        router.push(`/${uuid}/dashboard/task/epic?ticketId=${ticket.ticketId}`)
      }
    >
      <div className="flex items-center">
        <TicketSettingButton data={ticket} isText={false} />
        <p
          className="pl-[6px] text-[14px] overflow-hidden whitespace-nowrap text-ellipsis"
          style={{
            maxWidth: '180px',
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
