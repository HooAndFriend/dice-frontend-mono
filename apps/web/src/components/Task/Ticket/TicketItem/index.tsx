// ** Component Imports
import TicketUserButton from '../TicketUserButton'
import TicketStatusButton from '../TicketStatusButton'
import TicketSettingButton from '../TicketSettingButton'

// ** Utils Imports
import dayjs from 'dayjs'

// ** Type Imports
import { Ticket } from '@/src/type/ticket'

interface PropsType {
  data: Ticket
  selectTicketId?: number
  isEpic: boolean
  handleClick: (id: number) => void
  onDrag: (item) => void
  onDragEnter: (item) => void
  onDrop: (e) => void
}

const TicketViewItem = ({
  handleClick,
  data,
  isEpic,
  selectTicketId,
  onDrag,
  onDragEnter,
  onDrop,
}: PropsType) => {
  return (
    <tr
      onDragStart={() => {
        console.log(data.ticketId)
        onDrag(data.ticketId)
      }}
      onDragEnter={() => {
        onDragEnter(data.ticketId)
      }}
      onDragEnd={onDrop}
      draggable
      className={`border-b transition-colors cursor-pointer w-full ${
        data.ticketId === selectTicketId
          ? ' bg-blue-400 text-white'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
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
          <TicketSettingButton data={data} isText={false} />
        </div>
      </td>
      <td
        className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium pl-6 text-black overflow-hidden whitespace-nowrap text-ellipsis"
        style={{
          width: '55%',
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
