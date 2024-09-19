'use client'
// ** Component Imports
import CustomSearch from '@/src/components/Input/CustomSearch'
import AddTicketModal from '@/src/components/Modal/AddTicketModal'
import TicketTypeSelectFilter from '@/src/components/Task/Common/Filter/TypeFilter'
import KanbanCard from '@/src/components/Task/Kanban/KanbanCard'
import UserSelectBox from '@/src/components/UserSelectBox'
import { statusList } from '@/src/constants/status'
import { Put } from '@/src/repository'
import { CommonResponse } from '@/src/type/common'
import { EpicStatus } from '@/src/type/epic'

// ** Type Imports
import { Ticket } from '@/src/type/ticket'
import { WorkspaceUser } from '@/src/type/workspace'
import { useRef, useState } from 'react'
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'

interface PropsType {
  data: Ticket[]
  word: string
  checkedList: WorkspaceUser[]
  selectedEpicIds: number[]
  selectedTypeIds: number[]
  handleTypeSelectFilter: (typeId: number) => void
  setCheckedList: (list: WorkspaceUser[]) => void
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void
  refetch?: () => void
  handleModal: () => void
}

const KanbanContainer = ({
  data,
  word,
  handleTypeSelectFilter,
  handleWord,
  selectedTypeIds,
  setCheckedList,
  checkedList,
  refetch,
  handleModal,
}: PropsType) => {
  const dragItem = useRef(0)
  const dragOverItem = useRef()
  const [open, setOpen] = useState(false)

  const dragStart = (e, id) => {
    dragItem.current = id
    console.log(dragItem)
  }

  const dragEnter = (e, status) => {
    dragOverItem.current = status
    console.log(dragOverItem.current)
  }

  const drop = (e) => {
    console.log(
      'dragItem :',
      dragItem.current,
      'dragOverItem : ',
      dragOverItem.current,
    )
    updateTicketStatus.trigger(dragOverItem.current)
  }

  const updateTicketStatus = useSWRMutation(
    '/v1/ticket/status',
    async (url: string, { arg }: { arg: EpicStatus }) =>
      await Put<CommonResponse<void>>(url, {
        status: arg,
        ticketId: dragItem.current,
      }),
    {
      onSuccess: () => {
        mutate('/v1/ticket')
        mutate('/v1/epic')
        mutate(`/v1/ticket/detail/${dragItem.current}`)

        refetch && refetch()
      },
      onError: (error) => {
        console.log(error.response.data.message)
        handleModalOpen({
          title: 'Error',
          message: error.response.data.message,
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })
      },
    },
  )

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between pt-8 h-[8%]">
        <div className="flex items-center space-x-4">
          <CustomSearch width="200px" value={word} onChange={handleWord} />
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
            Total Ticket : {data.length}
          </h1>
        </div>
      </div>
      <div className="h-[92%] py-[24px] w-full overflow-x-auto">
        <div className="flex space-x-2 w-max">
          {statusList.map((item) => (
            <div
              onDragEnter={(e) => dragEnter(e, item)}
              onDragEnd={drop}
              onDragOver={(e) => e.preventDefault()}
              className="w-[300px] flex-shrink-0"
              key={item}
            >
              <div className="flex items-center justify-between px-[12px]">
                <h1>{item}</h1>
                <h1
                  className="cursor-pointer"
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  +
                </h1>
              </div>
              <div className="p-2">
                {data
                  .filter((_) => _.status === item)
                  .map((ticket) => (
                    <KanbanCard
                      dragStart={dragStart}
                      data={ticket}
                      key={ticket.ticketId}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {open && (
        <AddTicketModal open={open} setOpen={setOpen} refetch={refetch} />
      )}
    </div>
  )
}

export default KanbanContainer
function handleModalOpen(arg0: {
  title: string
  message: any
  logLevel: string
  buttonText: string
  type: string
}) {
  throw new Error('Function not implemented.')
}
