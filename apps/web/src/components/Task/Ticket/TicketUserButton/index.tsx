'use client'

// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'

// ** Swr Imports
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { Put } from '@/src/repository'
import { useGetWorkspaceUser } from '@/src/service/workspace-user'

// ** Component Imports
import UserSelectPopover from '../../Common/Popover/UserSelectPopover'

interface PropsType {
  profile: string
  userId: number
  email: string
  ticketId: number
  nickname?: string
  isNickname?: boolean
  type: 'user' | 'admin'
  disabled?: boolean
}

const TicketUserButton = ({
  profile,
  ticketId,
  email,
  isNickname,
  type,
  nickname,
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

  const updateTicketUser = useSWRMutation(
    '/v1/ticket/user',
    async (url: string, { arg }: { arg: number }) =>
      await Put<CommonResponse<void>>(url, { ticketId, type, userId: arg }),
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

  return (
    <UserSelectPopover
      open={open}
      name={name}
      email={email}
      profile={profile}
      nickname={
        nickname === '-'
          ? type === 'admin'
            ? 'No Admin'
            : 'No Worker'
          : nickname
      }
      isLoading={isLoading}
      data={
        isLoading
          ? []
          : name
            ? data.data.data.filter((workspaceUser) =>
                workspaceUser.user.nickname.includes(name),
              )
            : data.data.data
      }
      isNickname={isNickname}
      handleOpen={handleOpen}
      handleName={handleName}
      handleUpdateUser={updateTicketUser.trigger}
    />
  )
}

export default TicketUserButton
