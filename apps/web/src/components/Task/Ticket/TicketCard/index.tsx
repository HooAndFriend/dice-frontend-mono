// ** React Imports
import { KeyboardEvent, useEffect, useRef, useState } from 'react'

// ** Componet imports
import TicketCardView from './TicketCard'
import CardSkeleton from '../../Common/Card/CardSkeleton'

// ** Service Imports
import { Delete, Get, Patch } from '@/src/repository'
import useSWR, { mutate } from 'swr'

// ** Type Imports
import {
  GetTicketResponse,
  TicketEditMode,
  TicketInfo,
} from '@/src/type/ticket'
import { CommonResponse } from '@/src/type/common'

// ** Utils Imports
import useInput from '@/src/hooks/useInput'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'
import useSWRMutation from 'swr/mutation'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

interface PropsType {
  ticketId: number
  isPage?: boolean
  handleClose: () => void
}

const TicketCard = ({ ticketId, isPage, handleClose }: PropsType) => {
  const [subType, setSubType] = useState<'comment' | 'history'>('comment')
  const [selectImage, setSelectImage] = useState<string>('')
  const [previewOpen, setPreviewOpen] = useState<boolean>(false)
  const [linkOpen, setLinkOpen] = useState<boolean>(false)

  const cancelButtonRef = useRef(null)

  const [currentArg, setCurrentArg] = useState<
    'content' | 'name' | 'storypoint'
  >('name')
  const [mode, setMode] = useState<TicketEditMode>({
    content: 'view',
    storypoint: 'view',
    name: 'view',
  })

  const { data, handleInput, setData } = useInput<TicketInfo>({
    createdDate: null,
    modifiedDate: null,
    ticketId: 0,
    name: '',
    status: '',
    content: '',
    code: '',
    storypoint: 0,
    dueDate: null,
    completeDate: null,
    reopenDate: null,
    ticketFile: [],
    admin: {
      userId: 0,
      email: '',
      nickname: '',
      profile: '',
    },
    worker: {
      userId: 0,
      email: '',
      nickname: '',
      profile: '',
    },
    ticketSetting: null,
    parentLink: [],
    childLink: [],
    epic: null,
    priority: 'MEDIUM',
  })

  const { role } = useRecoilValue(WorkspaceState)

  const { handleOpen } = useDialog()

  const handlePreviewOpen = (image: string) => {
    setSelectImage(image)
    setPreviewOpen(true)
  }

  const {
    error,
    isLoading,
    mutate: ticketRefetch,
  } = useSWR(
    `/v1/ticket/detail/${ticketId}`,
    async (url) => Get<GetTicketResponse>(url),
    {
      onSuccess: (res) => {
        setData(res.data)
      },
    },
  )

  const updateTicket = useSWRMutation(
    '/v1/ticket',
    async (
      url: string,
      { arg }: { arg: 'content' | 'name' | 'storypoint' },
    ) => {
      setCurrentArg(arg)
      return await Patch<CommonResponse<void>>(url, {
        ticketId,
        value: data[arg],
        type: arg,
        storypoint: Number(data.storypoint),
      })
    },
    {
      onSuccess: () => {
        setMode((c) => ({ ...c, [currentArg]: 'view' }))
        mutate('/v1/ticket')
        mutate('/v1/epic')
        mutate(`/log/v1/ticket-history-log/${ticketId}`)
        mutate(`/v1/ticket/detail/${ticketId}`)
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

  const deleteTicketFile = useSWRMutation(
    '/v1/ticket/file/',
    async (url: string, { arg }: { arg: number }) =>
      await Delete<CommonResponse<void>>(url + arg),
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

  const deleteTicket = useSWRMutation(
    '/v1/ticket/',
    async (url: string, { arg }: { arg: number }) =>
      await Delete<CommonResponse<void>>(url + arg),
    {
      onSuccess: () => {
        ticketRefetch()
        handleClose()
        mutate('/v1/ticket')
        mutate('/v1/epic')
        mutate(`/v1/ticket/detail/${ticketId}`)
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

  const handleEnter = (
    e: KeyboardEvent<HTMLInputElement>,
    type: 'content' | 'name',
  ) => {
    if (e.key === 'Enter') {
      updateTicket.trigger(type)
    }
  }

  useEffect(() => {
    setMode({
      content: 'view',
      storypoint: 'view',
      name: 'view',
    })
    setLinkOpen(false)
  }, [ticketId])

  if (isLoading) return <CardSkeleton />

  return (
    <TicketCardView
      isPage={isPage}
      data={data}
      mode={mode}
      role={role}
      subType={subType}
      selectImage={selectImage}
      previewOpen={previewOpen}
      cancelButtonRef={cancelButtonRef}
      setSubType={setSubType}
      onChange={handleInput}
      setData={setData}
      setMode={setMode}
      setPreviewOpen={setPreviewOpen}
      handlePreviewOpen={handlePreviewOpen}
      handleClose={handleClose}
      ticketRefetch={ticketRefetch}
      handleDeleteTicket={deleteTicket.trigger}
      handleDeleteTicketFile={deleteTicketFile.trigger}
      handleUpdateTicket={updateTicket.trigger}
      handleEnter={handleEnter}
      linkOpen={linkOpen}
      setLinkOpen={setLinkOpen}
    />
  )
}

export default TicketCard
