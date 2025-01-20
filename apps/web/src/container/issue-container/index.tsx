// ** Component Imports
import TicketCard from '@/src/components/Task/Ticket/TicketCard'
import TicketTable from '@/src/components/Task/Ticket/TicketTable'
import TicketTableSkeleton from '@/src/components/Task/Ticket/TicketTable/TicketTableSkeleton'
import CustomSearch from '@/src/components/Input/CustomSearch'
import TicketStatusSelectFilter from '@/src/components/Task/Common/Filter/StatusFilter'
import TicketTypeSelectFilter from '@/src/components/Task/Common/Filter/TypeFilter'
import UserSelectBox from '@/src/components/UserSelectBox'

// ** Type Imports
import { Ticket } from '@/src/type/ticket'
import { WorkspaceUser } from '@/src/type/workspace'
import { EpicInfo, EpicStatus } from '@/src/type/epic'
import IssueTable from '@/src/components/Task/Issue/IssueTable'
import EpicFilter from '@/src/components/Task/Common/Filter/EpicFilter'

interface PropsType {
  ticketId: number
  data: Ticket[]
  epic: EpicInfo[]
  word: string
  ticketCount: number
  isLoading: boolean
  checkedList: WorkspaceUser[]
  selectedEpicIds: number[]
  selectedStatus: EpicStatus[]
  selectedTypeIds: number[]
  handleTypeSelectFilter: (typeId: number) => void
  handleStatusSelectFilter: (status: EpicStatus) => void
  handleEpicSelectFilter: (epicId: number) => void
  setCheckedList: (list: WorkspaceUser[]) => void
  setTicketId: (id: number) => void
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const IssueContainer = ({
  ticketId,
  data,
  epic,
  word,
  selectedStatus,
  selectedTypeIds,
  selectedEpicIds,
  isLoading,
  ticketCount,
  setTicketId,
  handleWord,
  checkedList,
  setCheckedList,
  handleEpicSelectFilter,
  handleTypeSelectFilter,
  handleStatusSelectFilter,
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
            Total Ticket : {ticketCount}
          </h1>
        </div>
      </div>
      <div className={`${ticketId !== 0 && 'flex'} h-[92%] py-[24px]`}>
        <div style={{ width: '25%', height: '100%' }}>
          {isLoading ? (
            <TicketTableSkeleton />
          ) : (
            <IssueTable
              handleClick={setTicketId}
              data={epic
                .filter((epic) =>
                  selectedEpicIds.length === 0
                    ? []
                    : selectedEpicIds.includes(epic.epicId),
                )
                .reduce((acc, epic) => acc.concat(epic.ticket), [])
                .filter((item) => item.name.includes(word))
                .filter((item) =>
                  checkedList.length === 0
                    ? true
                    : checkedList.some(
                        (_) => _.user.userId === item.worker?.userId,
                      ),
                )
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
                )}
            />
          )}
        </div>
        {ticketId !== 0 && (
          <div className="w-[75%] pl-8">
            <TicketCard
              isPage
              ticketId={ticketId}
              handleClose={() => setTicketId(0)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default IssueContainer
