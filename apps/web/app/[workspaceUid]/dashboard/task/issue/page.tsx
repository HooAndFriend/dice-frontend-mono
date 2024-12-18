'use client'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Component Imports
import IssueContainer from '@/src/container/issue-container'

// ** Service Imports
import { Get } from '@/src/repository'
import useSWR from 'swr'

// ** Type Imports
import { GetTicketListResponse } from '@/src/type/ticket'

// ** Context Imports
import { WorkspaceUser } from '@/src/type/workspace'
import { EpicStatus } from '@/src/type/epic'

const TablePage = () => {
  const [word, setWord] = useState<string>('')
  const [selectedEpicIds, setSelectedEpicIds] = useState<number[]>([])
  const [selectedStatus, setSelectedStatus] = useState<EpicStatus[]>([])
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([])

  const [ticketId, setTicketId] = useState<number>(0)
  const [checkedList, setCheckedList] = useState<WorkspaceUser[]>([])

  const [enabled, setEnabled] = useState<boolean>(false)

  const {
    data,
    error,
    isLoading,
    mutate: handleTicketRefetch,
  } = useSWR('/v1/ticket', async (url) => Get<GetTicketListResponse>(url))

  const handleEpicSelectFilter = (epicId: number) => {
    if (selectedEpicIds.includes(epicId)) {
      setSelectedEpicIds((c) => c.filter((id) => id !== epicId))
    } else {
      setSelectedEpicIds((c) => [...c, epicId])
    }
  }

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
    setTicketId(data?.data?.data.length > 0 ? data.data.data[0].ticketId : 0)
  }, [data])

  if (error || !enabled) return

  return (
    <IssueContainer
      ticketId={ticketId}
      selectedStatus={selectedStatus}
      selectedTypeIds={selectedTypeIds}
      selectedEpicIds={selectedEpicIds}
      data={isLoading ? [] : data.data.data}
      ticketCount={isLoading ? 0 : data.data.count}
      word={word}
      checkedList={checkedList}
      handleTypeSelectFilter={handleTypeSelectFilter}
      handleStatusSelectFilter={handleStatusSelectFilter}
      handleEpicSelectFilter={handleEpicSelectFilter}
      handleWord={(e) => setWord(e.target.value)}
      setCheckedList={setCheckedList}
      setTicketId={setTicketId}
      isLoading={isLoading}
    />
  )
}

export default TablePage
