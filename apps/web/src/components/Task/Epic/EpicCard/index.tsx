// ** React Imports
import { useState } from 'react'

// ** Componet imports
import EpicCardView from './EpicCard'
import CardSkeleton from '../../Common/Card/CardSkeleton'

// ** Service Imports
import { Delete, Get, Patch } from '@/src/repository'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'
import {
  EpicDetail,
  EpicEditMode,
  GetEpicDetailResponse,
} from '@/src/type/epic'

// ** Utils Imports
import useInput from '@/src/hooks/useInput'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

interface PropsType {
  epicId: number
  handleClose: () => void
}

const EpicCard = ({ epicId, handleClose }: PropsType) => {
  const [mode, setMode] = useState<EpicEditMode>({
    name: 'view',
    content: 'view',
  })
  const [currentArg, setCurrentArg] = useState<'content' | 'name'>('name')

  const { data, setData, handleInput } = useInput<EpicDetail>({
    id: 0,
    name: '',
    code: '',
    content: '',
    ticket: [],
    admin: null,
  })

  const { role } = useRecoilValue(WorkspaceState)

  const { handleOpen } = useDialog()

  const { isLoading, mutate: handleRefetch } = useSWR(
    `/v1/epic/${epicId}`,
    async (url) => Get<GetEpicDetailResponse>(url),
    {
      onSuccess: (res) => {
        setData(res.data)
      },
    },
  )

  const updateEpic = useSWRMutation(
    '/v1/epic',
    async (url: string, { arg }: { arg: 'name' | 'content' }) => {
      setCurrentArg(arg)
      return await Patch<CommonResponse<void>>(url, {
        epicId,
        name: data.name,
        content: data.content,
      })
    },
    {
      onSuccess: () => {
        setMode((c) => ({ ...c, [currentArg]: 'view' }))
        mutate('/v1/epic')
        mutate(`/v1/epic/${epicId}`)
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

  const deleteEpic = useSWRMutation(
    '/v1/epic/',
    async (url: string) => {
      return await Delete<CommonResponse<void>>(url + epicId)
    },
    {
      onSuccess: () => {
        mutate('/v1/epic')
        handleClose()
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

  if (isLoading) return <CardSkeleton />

  return (
    <EpicCardView
      mode={mode}
      setMode={setMode}
      role={role}
      data={data}
      setData={setData}
      onChange={handleInput}
      handleClose={handleClose}
      handleUpdateEpic={updateEpic.trigger}
      handleDeleteEpic={deleteEpic.trigger}
    />
  )
}

export default EpicCard
