'use client'

// ** React Imports
import { useEffect, useMemo, useState } from 'react'

// ** Component Imports
import TicketItem from '@/src/components/Task/Ticket/TicketItem'
import TicketAddItem from '@/src/components/Task/Ticket/TicketAddItem'

// ** Type Imports
import { EpicInfo, SelectContent } from '@/src/type/epic'
import { CommonResponse, NoneType } from '@/src/type/common'

// ** Utils Imports
import { DropResult } from 'react-beautiful-dnd'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Service Imports
import { Patch } from '@/src/repository'
import useSWRMutation from 'swr/mutation'
import { mutate } from 'swr'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface PropsType {
  item: EpicInfo
  word: string
  handleClick: (value: SelectContent) => void
}

const EpicItem = ({ item, handleClick, word }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)
  const [enabled, setEnabled] = useState<boolean>(false)

  const handleOpen = () => setOpen((c) => !c)

  const { handleOpen: handleDialogOpen } = useDialog()

  const { role } = useRecoilValue(WorkspaceState)

  const epicProgress = useMemo(() => {
    if (item.doneTicketCount === 0) {
      if (item.ticket.length === 0) return '0%'
      return '0%'
    }

    return `${(item.doneTicketCount / item.ticket.length) * 100}%`
  }, [item])

  const updateOrder = useSWRMutation(
    '/v1/ticket/order',
    async (
      url: string,
      { arg }: { arg: { ticketId: number; targetTicketId: number } },
    ) => await Patch<CommonResponse<void>>(url, arg),
    {
      onSuccess: ({ data }) => {
        mutate('/v1/epic')
      },
      onError: (error) => {
        handleDialogOpen({
          title: 'Error',
          message: error.response.data.message,
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })
      },
    },
  )

  const onDragEnd = ({ source, destination }: DropResult) => {
    updateOrder.trigger({
      ticketId: source.index,
      targetTicketId: destination.index,
    })
  }

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) return

  return (
    <>
      <tr
        className="w-full border-b transition-colors data-[state=selected]:bg-muted hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        onClick={handleOpen}
        style={{ width: '100%' }} // Removed table-layout: fixed to prevent conflicts
      >
        {/* Parent table cells */}
        <td
          className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
          style={{
            width: '5%',
          }}
        >
          <div className="flex items-center justify-center">
            <div className="flex items-center cursor-pointer">
              <div className="w-[24px] h-[24px] bg-green-300 rounded-[6px]" />
            </div>
          </div>
        </td>
        <td
          className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium pl-6"
          style={{
            width: '25%',
          }}
        >
          {`${item.code} - ${item.name}`}
        </td>
        <td
          className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
          style={{
            width: '70%',
          }}
        >
          <div className="flex items-center justify-center w-full">
            <div className="w-[90%] bg-[#F4F4FA] border-[1px] border-[#EBEBEC] rounded-[6px] h-[24px] dark:bg-gray-700 flex items-center">
              <div
                className={`bg-[#623AD6] h-[22px] rounded-[5px] border-[1px] border-[#EBEBEC]`}
                style={{
                  width: epicProgress,
                }}
              />
            </div>
            <div className="flex justify-center w-[10%]">
              <h4 className="text-[16px] font-san-medium">
                {item.doneTicketCount === 0
                  ? 0
                  : ((item.doneTicketCount / item.ticket.length) * 100).toFixed(
                      2,
                    )}{' '}
                %
              </h4>
            </div>
          </div>
        </td>
      </tr>
      {open && (
        <>
          <tr>
            <td colSpan={3} style={{ padding: 0 }}>
              <DndProvider backend={HTML5Backend}>
                <table className="w-full">
                  <tbody>
                    {item.ticket.map((ticket) => (
                      <TicketItem
                        key={ticket.ticketId}
                        data={ticket}
                        word={word}
                        isEpic
                        handleClick={(ticketId: number) => {
                          handleClick({ id: ticketId, type: 'TICKET' })
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </DndProvider>
              {role !== 'VIEWER' && <TicketAddItem epicId={item.epicId} />}
            </td>
          </tr>
        </>
      )}
    </>
  )
}

export default EpicItem
