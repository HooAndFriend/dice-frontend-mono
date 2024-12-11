'use client'

// ** React Imports
import { useState } from 'react'

// ** Type Imports
import { EpicStatus } from '@/src/type/epic'
import { CommonResponse } from '@/src/type/common'

// ** Service Imports
import useSWRMutation from 'swr/mutation'
import { Put } from '@/src/repository'
import { mutate } from 'swr'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Component Imports
import StatusPopover from '../../Common/Popover/StatusPopover'

interface PropsType {
  ticketId: number
  status: EpicStatus
  disabled?: boolean
  refetch?: () => void
}

const TicketStatusButton = ({
  status,
  ticketId,
  refetch,
  disabled,
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)

  const { handleOpen: handleModalOpen } = useDialog()

  const handleOpen = () => {
    if (disabled) return
    setOpen((c) => !c)
  }

  const handleStatus = (status: EpicStatus) => {
    updateTicketStatus.trigger(status)
  }

  const updateTicketStatus = useSWRMutation(
    '/v1/ticket/status',
    async (url: string, { arg }: { arg: EpicStatus }) =>
      await Put<CommonResponse<void>>(url, { status: arg, ticketId }),
    {
      onSuccess: () => {
        setOpen(false)
        mutate('/v1/ticket')
        mutate('/v1/epic')
        mutate(`/v1/ticket/detail/${ticketId}`)

        refetch && refetch()
      },
      onError: (error) => {
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
    <StatusPopover
      isQa={false}
      status={status}
      open={open}
      handleStatus={handleStatus}
      handleOpen={handleOpen}
    />
  )
}

export default TicketStatusButton
