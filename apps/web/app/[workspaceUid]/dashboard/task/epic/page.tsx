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
import { EpicStatus, GetEpicListResponse, SelectContent } from '@/src/type/epic'
import { WorkspaceUser } from '@/src/type/workspace'

const EpicConatiner = () => {
  const [word, setWord] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<EpicStatus[]>([])
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([])
  const [checkedList, setCheckedList] = useState<WorkspaceUser[]>([])
  const [enabled, setEnabled] = useState<boolean>(false)
  const [selectContent, setSelectContent] = useState<SelectContent>({
    id: 0,
    type: 'EPIC',
  })

  const searchParams = useSearchParams()

  const { data, error, isLoading } = useSWR('/v1/epic', async (url) =>
    Get<GetEpicListResponse>(url),
  )

  const handleStatusSelectFilter = (status: EpicStatus) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus((c) => c.filter((s) => s !== status))
    } else {
      setSelectedStatus((c) => [...c, status])
    }
  }

  const handleTypeSelectFilter = (typeId: number) => {
    if (selectedTypeIds.includes(typeId)) {
      setSelectedTypeIds((c) => c.filter((id) => id !== typeId))
    } else {
      setSelectedTypeIds((c) => [...c, typeId])
    }
  }

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
      checkedList={checkedList}
      selectedStatus={selectedStatus}
      selectedTypeIds={selectedTypeIds}
      setCheckedList={setCheckedList}
      handleWord={(e) => setWord(e.target.value)}
      handleStatusSelectFilter={handleStatusSelectFilter}
      handleTypeSelectFilter={handleTypeSelectFilter}
    />
  )
}

export default EpicConatiner
