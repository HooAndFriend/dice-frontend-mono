// ** Next Imports
import { useRouter } from 'next/navigation'

// ** React Imports
import { useState } from 'react'

// ** Type Imports
import { TicketInfo } from '@/src/type/ticket'
import { CommonResponse } from '@/src/type/common'

// ** Component Imports
import TicketSettingButton from '../TicketSettingButton'
import TicketStatusButton from '../TicketStatusButton'
import TicketUserButton from '../TicketUserButton'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

// ** Service Imports
import useSWRMutation from 'swr/mutation'
import { Delete } from '@/src/repository'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'
import Tooltip from '@/src/components/Tooltip'

interface PropsType {
  ticket: TicketInfo
  isChildren: boolean
  ticketLinkId?: number
  ticketRefetch?: () => void
}

const SubTicketItem = ({
  ticket,
  isChildren,
  ticketRefetch,
  ticketLinkId,
}: PropsType) => {
  const [isHovered, setIsHovered] = useState(false)

  const router = useRouter()
  const { uuid } = useRecoilValue(WorkspaceState)
  const { handleOpen } = useDialog()

  const deleteTicketLink = useSWRMutation(
    `/v1/ticket/link/${ticketLinkId}`,
    async (url: string) => Delete<CommonResponse<void>>(url),
    {
      onSuccess: () => {
        ticketRefetch()
      },
      onError: (error) => {
        handleOpen({
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
    <div
      className="w-full h-[50px] rounded-[5px] shadow flex items-center px-[12px] cursor-pointer"
      onClick={() =>
        router.push(`/${uuid}/dashboard/task/epic?ticketId=${ticket.ticketId}`)
      }
    >
      <div className="flex items-center w-[70%]">
        <TicketSettingButton
          data={ticket.ticketSetting}
          contentId={ticket.ticketId}
          type="TICKET"
          isText={false}
        />
        <div className="w-[calc(100%-24px)] flex">
          <Tooltip text={`${ticket.code} - ${ticket.name}`} width={64} isFull>
            <p
              className="pl-[6px] text-[14px] overflow-hidden whitespace-nowrap text-ellipsis w-full"
              style={{
                textDecorationLine:
                  ticket.status === 'COMPLETE' ? 'line-through' : 'none',
              }}
            >
              {`${ticket.code} - ${ticket.name}`}
            </p>
          </Tooltip>
        </div>
      </div>
      <div className="flex items-center justify-end w-[30%]">
        <TicketUserButton
          profile={ticket.worker ? ticket.worker.profile : '/images/dice.png'}
          nickname={ticket.worker ? ticket.worker.nickname : '-'}
          email={ticket.worker ? ticket.worker.email : '-'}
          userId={ticket.worker?.userId}
          type="user"
          ticketId={ticket.ticketId}
          isNickname={false}
        />
        <TicketStatusButton ticketId={ticket.ticketId} status={ticket.status} />
        {isChildren && (
          <div
            className="w-[45px] h-[45px] flex justify-center items-center cursor-pointer bg-blue-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && (
              <div
                className="w-[36px] h-[36px] rounded-[12px] flex justify-center items-center"
                onClick={() => deleteTicketLink.trigger()}
              >
                <h1 className="text-[18px]">X</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default SubTicketItem
