// ** Component Imports
import TicketUserButton from '../TicketUserButton'
import TicketStatusButton from '../TicketStatusButton'
import TicketSettingButton from '../TicketSettingButton'

// ** Utils Imports
import dayjs from 'dayjs'

// ** Type Imports
import { TicketInfo } from '@/src/type/ticket'

interface PropsType {
  data: TicketInfo
  isEpic: boolean
  isAdmin: boolean
  handleClick: (ticketid: number) => void
}

const TicketViewItem = ({ handleClick, data, isEpic, isAdmin }: PropsType) => {
  return (
    <tr
      className="border-b transition-colors data-[state=selected]:bg-muted hover:bg-gray-100 dark:hover:bg-gray-800 w-full cursor-pointer"
      onClick={() => handleClick(data.ticketId)}
      style={{
        width: '100%',
      }}
    >
      <td
        className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
        style={{
          width: '5%',
          paddingLeft: isEpic ? '48px' : '',
        }}
      >
        <div className="flex items-center justify-center">
          <TicketSettingButton
            data={data.ticketSetting}
            contentId={data.ticketId}
            type="TICKET"
            isText={false}
          />
        </div>
      </td>
      <td
        className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium pl-6"
        style={{
          width: isAdmin ? '45%' : '55%',
          textDecorationLine:
            data.status === 'COMPLETE' ? 'line-through' : 'none',
        }}
      >
        {`${data.code} - ${data.name}`}
      </td>
      <td
        className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
        style={{
          width: '10%',
        }}
      >
        <div className="flex items-center justify-center">
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
      </td>

      {isAdmin && (
        <td
          className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
          style={{
            width: '10%',
          }}
        >
          <div className="flex items-center justify-center">
            <TicketUserButton
              profile={data.admin ? data.admin.profile : '/images/dice.png'}
              nickname={data.admin ? data.admin.nickname : '-'}
              email={data.admin ? data.admin.email : '-'}
              userId={data.admin?.userId}
              type="user"
              ticketId={data.ticketId}
              isNickname={false}
            />
          </div>
        </td>
      )}
      <td
        className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
        style={{
          width: '15%',
          whiteSpace: 'nowrap',
          color:
            dayjs().isSame(dayjs(data.dueDate), 'day') &&
            !['COMPLETE', 'DONE'].includes(data.status)
              ? 'red'
              : 'black',
          textDecorationLine:
            data.status === 'COMPLETE' ? 'line-through' : 'none',
        }}
      >
        {data.dueDate ? dayjs(data.dueDate).format('YYYY-MM-DD') : '-'}
      </td>
      <td
        className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
        style={{
          width: '15%',
        }}
      >
        <TicketStatusButton ticketId={data.ticketId} status={data.status} />
      </td>
    </tr>
  )
}

export default TicketViewItem
