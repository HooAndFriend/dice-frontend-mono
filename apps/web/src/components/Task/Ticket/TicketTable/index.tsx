// ** React Imports
import { useCallback, useState } from 'react'

// ** Recoil Imports
import { WorkspaceState } from '@/src/app'
import { useRecoilValue } from 'recoil'

// ** Component Imports
import TicketAddItem from '../TicketAddItem'
import TicketItem from '../TicketItem'
import TicketHeader from '../TicketHeader'

// ** Utils Imports
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// ** Type Imports
import { Ticket } from '@/src/type/ticket'
import EpicHeader from '../../Epic/EpicHeader'

interface PropsType {
  data: Ticket[]
  word: string
  updateOrder: (arg: { ticketId: number; targetTicketId: number }) => void
  handleClick?: (id: number) => void
}

const TicketTable = ({ word, handleClick, data, updateOrder }: PropsType) => {
  const [ticketList, setTicketList] = useState<Ticket[]>(data)

  const { role } = useRecoilValue(WorkspaceState)

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setTicketList((prevCards: Ticket[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as any],
        ],
      }),
    )

    updateOrder({ ticketId: dragIndex, targetTicketId: hoverIndex })
  }, [])

  return (
    <div className="w-full h-full bg-white rounded-[8px] scrollbar-thumb-slate-700 scrollbar-track-slate-300">
      <div className="relative w-full h-full overflow-y-scroll scrollbar-thin">
        <div className="w-full h-full ">
          <table className="w-full text-sm caption-bottom">
            <EpicHeader />

            <tbody className="[&amp;_tr:last-child]:border-0">
              <DndProvider backend={HTML5Backend}>
                {ticketList
                  .filter((item) => item)
                  .map((item) => (
                    <TicketItem
                      handleClick={handleClick}
                      word={word}
                      data={item}
                      key={item.ticketId}
                      isEpic={false}
                      moveCard={moveCard}
                    />
                  ))}
              </DndProvider>
              {role !== 'VIEWER' && <TicketAddItem />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TicketTable
