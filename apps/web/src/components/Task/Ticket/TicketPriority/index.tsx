'use client'

// ** React Imports
import { useState, ChangeEvent, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'

// ** Swr Imports
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { Patch } from '@/src/repository'
import { useGetWorkspaceUser } from '@/src/service/workspace-user'

// ** Component Imports
import {
  getPriortiryImage,
  getPriortiryLabel,
  PRIORITY_LIST,
  Priortiry,
} from '@/src/constants/priority'
import Image from 'next/image'

interface PropsType {
  priortiry: Priortiry
  ticketId: number
  displayName?: boolean
  disabled?: boolean
}

const TicketPriorityButton = ({
  priortiry,
  ticketId,
  displayName,
  disabled,
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [position, setPosition] = useState({ x: 0, y: 0 }) // 마우스 클릭 위치 상태

  const { data, error, isLoading, mutate: refetch } = useGetWorkspaceUser(name)
  const { handleOpen: handleDialogOpen } = useDialog()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleOpen = (e?: React.MouseEvent) => {
    if (disabled) return
    if (e) {
      setPosition({ x: e.clientX, y: e.clientY }) // 클릭한 위치 저장
    }
    setOpen((c) => !c)
  }

  const updateTicketPriority = useSWRMutation(
    '/v1/ticket/priority',
    async (url: string, { arg }: { arg: Priortiry }) =>
      await Patch<CommonResponse<void>>(url, { ticketId, priority: arg }),
    {
      onSuccess: () => {
        mutate('/v1/ticket')
        mutate('/v1/epic')
        mutate(`/v1/ticket/detail/${ticketId}`)
        setOpen(false)
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

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', clickOutside)

    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleOpen} // 클릭 시 위치 저장
      >
        <Image
          src={getPriortiryImage(priortiry)}
          alt="priority"
          width={24}
          height={24}
        />
        {displayName && (
          <p className="text-[14px] text-black ml-2">
            {getPriortiryLabel(priortiry)}
          </p>
        )}
      </div>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute w-[222px] h-[158px] bg-white shadow-lg rounded-[8px] overflow-y-auto z-[9999] overflow-x-hidden"
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y + 10, // 마우스 클릭 위치 기준
              transform: 'translateX(-50%)', // 가운데 정렬
            }}
          >
            <hr className="w-full" />
            <div className="px-[8px] py-[8px]">
              {PRIORITY_LIST.map((item) => (
                <div
                  className="flex w-[206px] h-[32px] items-center rounded-[8px] cursor-pointer"
                  key={item.value}
                  onClick={() => updateTicketPriority.trigger(item.value)}
                  style={{
                    backgroundColor:
                      item.value === priortiry ? '#F4F4FA' : 'white',
                  }}
                >
                  <Image
                    className="mr-[10px]"
                    alt="profile"
                    src={item.image}
                    width={20}
                    height={20}
                  />
                  <p className="text-[12px] text-black">{item.label}</p>
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}

export default TicketPriorityButton
