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

interface PropsType {
  item: EpicInfo
  handleClick: (value: SelectContent) => void
}

const EpicItem = ({ item, handleClick }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)
  const [enabled, setEnabled] = useState<boolean>(false)

  const router = useRouter()

  const handleOpen = () => setOpen((c) => !c)

  const { role, uuid } = useRecoilValue(WorkspaceState)

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

  return (
    <>
      <tr
        className="w-full border-b transition-colors data-[state=selected]:bg-muted hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        onClick={() => {
          handleOpen()
          router.push(`/${uuid}/dashboard/task/epic?epicId=${item.epicId}`)
          handleClick({ id: item.epicId, type: 'EPIC' })
        }}
        style={{ width: '100%' }}
      >
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
          className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
          style={{
            width: '10%',
          }}
        >
          <div className="flex justify-center w-[10%]">
            <h4 className="text-[16px] font-san-medium">
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
                      key={ticket.ticketId}
                      data={ticket}
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
