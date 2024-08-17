// ** Component Imports
// import EpicCard from "@/src/components/Task/Epic/EpicCard";
import TicketCard from '@/src/components/Task/Ticket/TicketCard'
// import EpicTableSkeleton from "@/src/components/Task/Epic/EpicTable/EpicTableSkeleton";
// import EpicSearchCard from "@/src/components/Task/Epic/EpicSearchCard";

// ** Utils Imports
import { DropResult } from 'react-beautiful-dnd'

// ** Type Imports
import { EpicInfo, EpicStatus, SelectContent } from '@/src/type/epic'
import { WorkspaceUser } from '@/src/type/workspace'
import EpicTable from '@/src/components/Task/Epic/EpicTable'

interface PropsType {
  word: string
  epicData: EpicInfo[]
  epicCount: number
  isLoading: boolean
  checkedList: WorkspaceUser[]
  selectContent: SelectContent
  selectedTypeIds: number[]
  selectedStatus: EpicStatus[]
  handleTypeSelectFilter: (typeId: number) => void
  handleStatusSelectFilter: (status: EpicStatus) => void
  setCheckedList: (list: WorkspaceUser[]) => void
  setSelectContent: (value: SelectContent) => void
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDragEnd: ({ source, destination }: DropResult) => void
}

const EpicContainer = ({
  epicData,
  isLoading,
  epicCount,
  word,
  checkedList,
  selectContent,
  selectedTypeIds,
  selectedStatus,
  setCheckedList,
  handleStatusSelectFilter,
  handleTypeSelectFilter,
  setSelectContent,
  handleWord,
  onDragEnd,
}: PropsType) => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between pt-8 h-[8%]">
        {/* <div className="flex items-center space-x-4">
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
        <div className="flex items-center">
          <h1 className="text-[18px] font-san-medium">
            Total Ticket : {ticketCount}
          </h1>
        </div> */}
      </div>
      <div className={`${selectContent.id !== 0 && 'flex'} h-[92%] py-[24px]`}>
        <div
          style={{
            width: selectContent.id !== 0 ? '65%' : '100%',
            height: '100%',
          }}
        >
          {isLoading ? (
            <></>
          ) : (
            // <EpicTableSkeleton />
            <EpicTable
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
        {/* {selectContent.id !== 0 && selectContent.type === "EPIC" && (
          <div className="w-[35%] ml-[30px]">
            <EpicCard
              epicId={selectContent.id}
              handleClose={() => setSelectContent({ id: 0, type: "EPIC" })}
            />
          </div>
        )} */}
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
