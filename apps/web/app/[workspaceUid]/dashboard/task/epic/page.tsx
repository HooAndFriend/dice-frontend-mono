'use client'
// ** Next Imports
import { useSearchParams } from 'next/navigation'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Component Imports
import EpicContainer from '@/src/container/epic-container'

// ** Service Imports
import useSWR, { mutate } from 'swr'
import { Get, Patch } from '@/src/repository'
import useSWRMutation from 'swr/mutation'

// ** Type Imports
import { GetEpicListResponse, SelectContent } from '@/src/type/epic'
import { CommonResponse } from '@/src/type/common'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

const EpicConatiner = () => {
  const [word, setWord] = useState<string>('')
  const [enabled, setEnabled] = useState<boolean>(false)
  const [selectContent, setSelectContent] = useState<SelectContent>({
    id: 0,
    type: 'EPIC',
  })

  const searchParams = useSearchParams()

  const { handleOpen } = useDialog()

  const { data, error, isLoading } = useSWR('/v1/epic', async (url) =>
    Get<GetEpicListResponse>(url),
  )

  const updateEpicOrder = useSWRMutation(
    '/v1/epic/order',
    async (
      url: string,
      { arg }: { arg: { epicId: number; targetEpicId: number } },
    ) => await Patch<CommonResponse<void>>(url, arg),
    {
      onSuccess: ({ data }) => {
        mutate('/v1/epic')
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

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  useEffect(() => {
    const ticketId = searchParams.get('ticketId')
    if (ticketId) {
      setSelectContent({
        id: Number(ticketId),
        type: 'TICKET',
      })
    }
  }, [])

  if (error || !enabled) return

  return (
    <EpicContainer
      epicData={isLoading ? [] : data.data.data}
      epicCount={isLoading ? 0 : data.data.count}
      word={word}
      selectContent={selectContent}
      setSelectContent={setSelectContent}
      isLoading={isLoading}
      updateOrder={updateEpicOrder.trigger}
    />
  )
}

export default EpicConatiner
