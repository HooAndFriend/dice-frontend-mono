'use client'
// ** Next Imports
import { useRouter } from 'next/navigation'

// ** React Imports
import { useEffect, useMemo, useState } from 'react'

// ** Component Imports
import TicketItem from '@/src/components/Task/Ticket/TicketItem'
import TicketAddItem from '@/src/components/Task/Ticket/TicketAddItem'

// ** Type Imports
import { EpicInfo, SelectContent } from '@/src/type/epic'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'
import useSWRMutation from 'swr/mutation'
import { Patch } from '@/src/repository'
import { CommonResponse } from '@/src/type/common'
import TicketSettingButton from '../../Ticket/TicketSettingButton'

interface PropsType {
  item: EpicInfo
  selectContent: SelectContent
  handleClick: (value: SelectContent) => void
  onDragStart: (item) => void
  onDragOver: (e, item) => void
  onDrop: () => void
}

const EpicItem = ({
  item,
  handleClick,
  selectContent,
  onDragStart,
  onDragOver,
  onDrop,
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)
  const [enabled, setEnabled] = useState<boolean>(false)
  const [ticketId, setTicketId] = useState()
  const [targetTicketId, setTargetTicketId] = useState()
  const router = useRouter()

  const handleOpen = () => setOpen((c) => !c)

  const { role, uuid } = useRecoilValue(WorkspaceState)

  const editTicket = useSWRMutation(
    '/v1/ticket/order',
    async (url: string) =>
      await Patch<CommonResponse<void>>(url, { ticketId, targetTicketId }),
    {
      onSuccess: () => {},
      onError: (err) => {},
    },
  )

  const epicProgress = useMemo(() => {
    if (item.doneTicketCount === 0) {
      if (item.ticket.length === 0) return '0%'
      return '0%'
    }

    return `${(item.doneTicketCount / item.ticket.length) * 100}%`
  }, [item])

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) return

  const onDragTicket = (item) => {
    setTicketId(item)
  }

  const onDragEnterTicket = (item) => {
    setTargetTicketId(item)
  }

  const onDropTicket = () => {
    editTicket.trigger()
  }

  return (
    <>
      <tr
        draggable
        onDragStart={() => onDragStart(item.epicId)}
        onDragOver={(e) => onDragOver(e, item.epicId)}
        onDrop={onDrop}
        className="w-full border-b transition-colors data-[state=selected]:bg-muted hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        onClick={() => {
          handleOpen()
          router.push(`/${uuid}/dashboard/task/epic?epicId=${item.epicId}`)
          handleClick({ id: item.epicId, type: 'EPIC' })
        }}
        style={{ width: '100%' }}
      >
        <td
          className="py-[12px] align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
          style={{
            width: '5%',
          }}
        >
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <TicketSettingButton
                data={item.ticketSetting}
                contentId={item.epicId}
                type="EPIC"
                isText={false}
              />
            </div>
          </div>
        </td>
        <td
          className="align-middle [&:has([role=checkbox])]:pr-0 font-medium pl-6 text-[12px] py-[12px]"
          style={{
            width: '25%',
          }}
        >
          {`${item.code} - ${item.name}`}
        </td>
        <td
          className="align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6 py-[12px]"
          style={{
            width: '60%',
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
          </div>
        </td>
        <td
          className="align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6 py-[12px]"
          style={{
            width: '10%',
          }}
        >
          <div className="flex justify-center w-[10%]">
            <h4 className="text-[12px] font-san-medium">
              {item.doneTicketCount === 0 || item.ticket.length === 0
                ? 0
                : ((item.doneTicketCount / item.ticket.length) * 100).toFixed(
                    2,
                  )}
              %
            </h4>
          </div>
        </td>
      </tr>
      {open && (
        <>
          <tr>
            <td colSpan={4} style={{ padding: 0, width: '100%' }}>
              <table className="w-full">
                <tbody>
                  {item.ticket.map((ticket) => (
                    <TicketItem
                      onDrag={onDragTicket}
                      onDragEnter={onDragEnterTicket}
                      onDrop={onDropTicket}
                      key={ticket.ticketId}
                      data={ticket}
                      selectTicketId={
                        selectContent.type === 'TICKET'
                          ? selectContent.id
                          : undefined
                      }
                      isEpic
                      handleClick={(ticketId: number) => {
                        router.push(
                          `/${uuid}/dashboard/task/epic?ticketId=${ticketId}`,
                        )
                        handleClick({ id: ticketId, type: 'TICKET' })
                      }}
                    />
                  ))}
                  {role !== 'VIEWER' && (
                    <TicketAddItem epicId={item.epicId} isEpic />
                  )}
                </tbody>
              </table>
            </td>
          </tr>
        </>
      )}
    </>
  )
}

export default EpicItem
