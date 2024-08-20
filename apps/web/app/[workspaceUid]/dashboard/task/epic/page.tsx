'use client'
// ** Next Imports
import { useSearchParams } from 'next/navigation'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Component Imports
import EpicContainer from '@/src/container/epic-container'

// ** Service Imports
import useSWR from 'swr'
import { Get } from '@/src/repository'

// ** Type Imports
import { GetEpicListResponse, SelectContent } from '@/src/type/epic'

const EpicConatiner = () => {
  const [word, setWord] = useState<string>('')
  const [enabled, setEnabled] = useState<boolean>(false)
  const [selectContent, setSelectContent] = useState<SelectContent>({
    id: 0,
    type: 'EPIC',
  })

  const searchParams = useSearchParams()

  const { data, error, isLoading } = useSWR('/v1/epic', async (url) =>
    Get<GetEpicListResponse>(url),
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
    />
  )
}

export default EpicConatiner
