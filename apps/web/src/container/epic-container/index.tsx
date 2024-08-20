// ** Component Imports

import TicketCard from '@/src/components/Task/Ticket/TicketCard'

// ** Type Imports
import { EpicInfo, SelectContent } from '@/src/type/epic'

// ** Component Imports
import EpicTable from '@/src/components/Task/Epic/EpicTable'
import EpicTableSkeleton from '@/src/components/Task/Epic/EpicTable/EpicTableSkeleton'
import EpicCard from '@/src/components/Task/Epic/EpicCard'

interface PropsType {
  word: string
  epicData: EpicInfo[]
  epicCount: number
  isLoading: boolean
  selectContent: SelectContent
  updateOrder: (arg: { epicId: number; targetEpicId: number }) => void
  setSelectContent: (value: SelectContent) => void
}

const EpicContainer = ({
  epicData,
  isLoading,
  epicCount,
  updateOrder,
  word,
  selectContent,
  setSelectContent,
}: PropsType) => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between pt-8 h-[8%]"></div>
      <div className={`${selectContent.id !== 0 && 'flex'} h-[92%] py-[24px]`}>
        <div
          style={{
            width: selectContent.id !== 0 ? '65%' : '100%',
            height: '100%',
          }}
        >
          {isLoading ? (
            <EpicTableSkeleton />
          ) : (
            <EpicTable
              updateOrder={updateOrder}
              handleClick={(value: SelectContent) => {
                setSelectContent(value)
              }}
              epicData={epicData
                .filter((item) => item.name.includes(word))
                .map((item) => ({
                  ...item,
                  ticket: item.ticket,
                  // .filter((item) =>
                  //   selectedStatus.length === 0
                  //     ? true
                  //     : selectedStatus.includes(item.status)
                  // )
                  // .filter((item) =>
                  //   selectedTypeIds.length === 0
                  //     ? true
                  //     : selectedTypeIds.includes(item.ticketSetting?.id)
                  // )
                  // .filter((item) =>
                  //   checkedList.length === 0
                  //     ? true
                  //     : checkedList.some(
                  //         (_) => _.teamUser.user.id === item.worker?.id
                  //       )
                  // ),
                }))}
            />
          )}
        </div>
        {selectContent.id !== 0 && selectContent.type === 'EPIC' && (
          <div className="w-[35%] ml-[30px]">
            <EpicCard
              epicId={selectContent.id}
              handleClose={() => setSelectContent({ id: 0, type: 'EPIC' })}
            />
          </div>
        )}
        {selectContent.id !== 0 && selectContent.type === 'TICKET' && (
          <div className="w-[35%] ml-8 -mt-[44px]">
            <TicketCard
              ticketId={selectContent.id}
              handleClose={() => setSelectContent({ id: 0, type: 'TICKET' })}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default EpicContainer
