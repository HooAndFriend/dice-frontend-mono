// ** React Imports
import { useCallback, useState } from 'react'

// ** Recoil Imports
import { WorkspaceState } from '@/src/app'
import { useRecoilValue } from 'recoil'

// ** Component Imports
import TicketAddItem from '../TicketAddItem'
import TicketItem from '../TicketItem'

// ** Type Imports
import { Ticket } from '@/src/type/ticket'
import EpicHeader from '../../Epic/EpicHeader'

interface PropsType {
  data: Ticket[]
  handleClick?: (id: number) => void
}

const TicketTable = ({ handleClick, data }: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState)

  return (
    <div className="w-full h-full bg-white rounded-[8px] scrollbar-thumb-slate-700 scrollbar-track-slate-300">
      <div className="relative w-full h-full overflow-y-scroll scrollbar-thin">
        <div className="w-full h-full ">
          <table className="w-full text-sm caption-bottom">
            <EpicHeader />
            <tbody className="[&amp;_tr:last-child]:border-0">
              {data
                .filter((item) => item)
                .map((item) => (
                  <TicketItem
                    handleClick={handleClick}
                    data={item}
                    key={item.ticketId}
                    isEpic={false}
                  />
                ))}

              {role !== 'VIEWER' && <TicketAddItem />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TicketTable
