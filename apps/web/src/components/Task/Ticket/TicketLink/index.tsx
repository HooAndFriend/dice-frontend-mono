'use client'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Component Imports
import TicketSettingButton from '../TicketSettingButton'
import TicketUserButton from '../TicketUserButton'
import TicketStatusButton from '../TicketStatusButton'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Service Imports
import useSWRMutation from 'swr/mutation'
import { Get, Post } from '@/src/repository'
import useSWR from 'swr'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'
import { GetTicketListResponse, Ticket } from '@/src/type/ticket'

interface PropsType {
  ticketId: number
  childTicketIdList: number[]
  setLinkOpen: (value: boolean) => void
  ticketRefetch: () => void
}

const TicketLink = ({
  ticketId,
  setLinkOpen,
  childTicketIdList,
  ticketRefetch,
}: PropsType) => {
  const [name, setName] = useState<string>('')
  const [selectTicket, setSelectTicket] = useState<Ticket>(null)

  const { handleOpen } = useDialog()

  const { error, isLoading, mutate, data } = useSWR(`/v1/ticket`, async (url) =>
    Get<GetTicketListResponse>(url),
  )

  const saveTicketLink = useSWRMutation(
    '/v1/ticket/link',
    async (url: string) => {
      return await Post<CommonResponse<void>>(url, {
        parentTicketId: ticketId,
        childTicketId: selectTicket?.ticketId,
      })
    },
    {
      onSuccess: () => {
        ticketRefetch()
        setLinkOpen(false)
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
    <div className="w-full ">
      <input
        id="content"
        className="px-4 w-full border border-lightGray rounded-[10px] h-[36px] mb-[12px]"
        list="result"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {selectTicket && (
        <div
          className="w-full h-[50px] rounded-[5px] shadow grid grid-cols-2 items-center px-[12px] cursor-pointer"
          // onClick={() => setSelectTicket(ticket)}
        >
          <div className="flex items-center">
            <TicketSettingButton data={selectTicket} isText={false} disabled />
            <p
              className="pl-[6px] text-[14px] overflow-hidden whitespace-nowrap text-ellipsis"
              style={{
                maxWidth: '180px',
                textDecorationLine:
                  selectTicket.status === 'COMPLETE' ? 'line-through' : 'none',
              }}
            >
              {`${selectTicket.code} - ${selectTicket.name}`}
            </p>
          </div>
          <div className="flex items-center justify-end">
            <TicketUserButton
              profile={
                selectTicket.worker
                  ? selectTicket.worker.profile
                  : '/images/dice.png'
              }
              nickname={
                selectTicket.worker ? selectTicket.worker.nickname : '-'
              }
              email={selectTicket.worker ? selectTicket.worker.email : '-'}
              userId={selectTicket.worker?.userId}
              type="user"
              ticketId={selectTicket.ticketId}
              isNickname={false}
              disabled
            />
            <TicketStatusButton
              ticketId={selectTicket.ticketId}
              status={selectTicket.status}
              disabled
            />
            <div className="w-[45px] h-[45px] flex justify-center items-center cursor-pointer">
              <div
                className="w-[36px] h-[36px] bg-blue-100 rounded-[12px] flex justify-center items-center"
                onClick={() => setSelectTicket(null)}
              >
                <h1 className="text-[18px]">X</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="h-[240px] overflow-y-scroll  border border-lightGray  rounded-[10px] mt-[12px]">
        {!isLoading &&
          data?.data?.data
            .filter(
              (ticket) =>
                ticket.name.includes(name) || ticket.code.includes(name),
            )
            .filter((ticket) => ticket.ticketId !== ticketId)
            .filter((ticket) => !childTicketIdList.includes(ticket.ticketId))
            .map((ticket) => (
              <div
                className={`w-full h-[50px] rounded-[5px] grid grid-cols-2 items-center px-[12px] cursor-pointer ${
                  selectTicket && selectTicket.ticketId === ticket.ticketId
                    ? ' bg-blue-400 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setSelectTicket(ticket)}
              >
                <div className="flex items-center">
                  <TicketSettingButton data={ticket} isText={false} disabled />
                  <p
                    className="pl-[6px] text-[14px] overflow-hidden whitespace-nowrap text-ellipsis"
                    style={{
                      maxWidth: '180px',
                      textDecorationLine:
                        ticket.status === 'COMPLETE' ? 'line-through' : 'none',
                    }}
                  >
                    {`${ticket.code} - ${ticket.name}`}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <TicketUserButton
                    profile={
                      ticket.worker ? ticket.worker.profile : '/images/dice.png'
                    }
                    nickname={ticket.worker ? ticket.worker.nickname : '-'}
                    email={ticket.worker ? ticket.worker.email : '-'}
                    userId={ticket.worker?.userId}
                    type="user"
                    ticketId={ticket.ticketId}
                    isNickname={false}
                    disabled
                  />
                  <TicketStatusButton
                    ticketId={ticket.ticketId}
                    status={ticket.status}
                    disabled
                  />
                </div>
              </div>
            ))}
      </div>
      <div className="mt-[12px] flex justify-end">
        <button
          className="bg-gray-200 mr-[6px] text-[12px] px-[12px] rounded-[6px]"
          disabled={!selectTicket}
          onClick={() => saveTicketLink.trigger()}
        >
          Add
        </button>
        <button
          className="text-[12px] px-[12px]"
          onClick={() => setLinkOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default TicketLink
