'use client'

// ** React Imports
import { useState, ChangeEvent, useEffect, useRef } from 'react'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'

// ** Swr Imports
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { Patch, Put } from '@/src/repository'
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

  const { data, error, isLoading, mutate: refetch } = useGetWorkspaceUser(name)

  const { handleOpen: handleDialogOpen } = useDialog()

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleOpen = () => {
    if (disabled) return
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

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleOpen()
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
        onClick={(e) => {
          e.stopPropagation()
          handleOpen()
        }}
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
      {open && (
        <div
          className="absolute w-[222px] h-[158px] bg-white shadow-lg top-[50px] left-0 rounded-[8px] overflow-y-auto z-10 overflow-x-hidden"
          ref={dropdownRef}
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
        </div>
      )}
    </div>
  )
}

export default TicketPriorityButton
