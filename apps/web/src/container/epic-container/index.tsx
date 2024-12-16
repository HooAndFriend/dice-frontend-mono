// ** Component Imports

import TicketCard from '@/src/components/Task/Ticket/TicketCard'

// ** Type Imports
import { EpicInfo, EpicStatus, SelectContent } from '@/src/type/epic'
import { WorkspaceUser } from '@/src/type/workspace'

// ** Component Imports
import EpicTable from '@/src/components/Task/Epic/EpicTable'
import EpicTableSkeleton from '@/src/components/Task/Epic/EpicTable/EpicTableSkeleton'
import EpicCard from '@/src/components/Task/Epic/EpicCard'
import CustomSearch from '@/src/components/Input/CustomSearch'
import TicketStatusSelectFilter from '@/src/components/Task/Common/Filter/StatusFilter'
import TicketTypeSelectFilter from '@/src/components/Task/Common/Filter/TypeFilter'
import UserSelectBox from '@/src/components/UserSelectBox'

interface PropsType {
  word: string
  epicData: EpicInfo[]
  epicCount: number
  isLoading: boolean
  selectContent: SelectContent
  checkedList: WorkspaceUser[]
  selectedTypeIds: number[]
  selectedStatus: EpicStatus[]
  handleTypeSelectFilter: (typeId: number) => void
  handleStatusSelectFilter: (status: EpicStatus) => void
  setCheckedList: (list: WorkspaceUser[]) => void
  setSelectContent: (value: SelectContent) => void
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EpicContainer = ({
  epicData,
  isLoading,
  epicCount,
  word,
  checkedList,
  selectedStatus,
  selectedTypeIds,
  handleWord,
  handleStatusSelectFilter,
  handleTypeSelectFilter,
  setCheckedList,
  selectContent,
  setSelectContent,
}: PropsType) => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between pt-8 h-[8%]">
        <div className="flex items-center space-x-4">
          <CustomSearch width="200px" value={word} onChange={handleWord} />
          <TicketStatusSelectFilter
            selectedStatus={selectedStatus}
            handleEpicSelectFilter={handleStatusSelectFilter}
          />
          <TicketTypeSelectFilter
            selectedTypeIds={selectedTypeIds}
            handleTypeSelectFilter={handleTypeSelectFilter}
          />
          <UserSelectBox
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
      </div>
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
              handleClick={(value: SelectContent) => {
                setSelectContent(value)
              }}
              selectContent={selectContent}
              epicData={epicData
                .filter((item) => item.name.includes(word))
                .map((item) => ({
                  ...item,
                  ticket: item.ticket
                    .filter((item) =>
                      selectedStatus.length === 0
                        ? true
                        : selectedStatus.includes(item.status),
                    )
                    .filter((item) =>
                      selectedTypeIds.length === 0
                        ? true
                        : selectedTypeIds.includes(
                            item.ticketSetting?.ticketSettingId,
                          ),
                    )
                    .filter((item) =>
                      checkedList.length === 0
                        ? true
                        : checkedList.some(
                            (_) => _.user.userId === item.worker?.userId,
                          ),
                    ),
                }))
                .filter((item) => {
                  if (
                    selectedStatus.length > 0 ||
                    selectedTypeIds.length > 0 ||
                    checkedList.length > 0
                  ) {
                    return item.ticket.length > 0
                  }

                  return true
                })}
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
          <div className="w-[35%] ml-8">
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
