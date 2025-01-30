'use client'
// ** Component Imports
import CustomSearch from '@/src/components/Input/CustomSearch'
import EpicFilter from '@/src/components/Task/Common/Filter/EpicFilter'
import TicketTypeSelectFilter from '@/src/components/Task/Common/Filter/TypeFilter'
import KanbanCard from '@/src/components/Task/Kanban/KanbanCard'
import UserSelectBox from '@/src/components/UserSelectBox'
import { statusList } from '@/src/constants/status'
import { Epic, EpicInfo } from '@/src/type/epic'

// ** Type Imports
import { Ticket } from '@/src/type/ticket'
import { WorkspaceUser } from '@/src/type/workspace'

interface PropsType {
  data: Ticket[]
  word: string
  checkedList: WorkspaceUser[]
  selectedEpicIds: number[]
  selectedTypeIds: number[]
  handleTypeSelectFilter: (typeId: number) => void
  handleEpicSelectFilter: (epicId: number) => void
  setCheckedList: (list: WorkspaceUser[]) => void
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const KanbanContainer = ({
  data,
  word,
  selectedEpicIds,
  handleEpicSelectFilter,
  handleTypeSelectFilter,
  handleWord,
  selectedTypeIds,
  setCheckedList,
  checkedList,
}: PropsType) => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between pt-8 h-[8%]">
        <div className="flex items-center space-x-4">
          <CustomSearch width="200px" value={word} onChange={handleWord} />
          <TicketTypeSelectFilter
            selectedTypeIds={selectedTypeIds}
            handleTypeSelectFilter={handleTypeSelectFilter}
          />
          <EpicFilter
            selectedEpicIds={selectedEpicIds}
            handleEpicSelectFilter={handleEpicSelectFilter}
          />
          <UserSelectBox
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
        <div className="flex items-center">
          <h1 className="text-[18px] font-san-medium">
            Total Ticket : {data.length}
          </h1>
        </div>
      </div>
      <div className="h-[92%] py-[24px] w-full overflow-x-auto">
        <div className="flex space-x-2 w-max">
          {statusList.map((item) => (
            <div className="w-[300px] flex-shrink-0" key={item}>
              <div className="flex items-center justify-between px-[12px]">
                <h1>{item}</h1>
                <h1 className="cursor-pointer ">+</h1>
              </div>
              <div className="p-2">
                {data
                  .filter((item) =>
                    selectedEpicIds.length === 0
                      ? []
                      : selectedEpicIds.includes(item.epic.epicId),
                  )
                  .filter((ticket) => ticket.status === item)
                  .map((ticket) => (
                    <KanbanCard data={ticket} key={ticket.ticketId} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KanbanContainer
