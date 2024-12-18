import { Ticket } from '@/src/type/ticket'
import KanbanCard from '../../Kanban/KanbanCard'
import TicketViewItem from '../../Ticket/TicketItem'

interface PropsType {
  data: Ticket[]
  handleClick?: (id: number) => void
}

const IssueTable = ({ handleClick, data }: PropsType) => {
  return (
    <div className="w-full  px-4 h-full rounded-[8px] scrollbar-thumb-slate-700 scrollbar-track-slate-300">
      <div className="relative w-full h-full overflow-y-scroll scrollbar-thin">
        <div className="w-full h-full">
          <table className="w-full text-sm caption-bottom">
            <tbody className="[&amp;_tr:last-child]:border-0">
              {data
                .filter((item) => item)
                .map((item) => (
                  <KanbanCard
                    key={item.ticketId}
                    data={item}
                    isClick
                    handleClick={handleClick}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default IssueTable
