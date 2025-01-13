'use client'
// ** Next Imports
import { useSearchParams } from 'next/navigation'

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
import {
  GetSearchWorkspaceUserListResponse,
  WorkspaceUser,
} from '@/src/type/workspace'
import { EpicStatus } from '@/src/type/epic'

const TablePage = () => {
  const [word, setWord] = useState<string>('')
  const [selectedEpicIds, setSelectedEpicIds] = useState<number[]>([])
  const [selectedStatus, setSelectedStatus] = useState<EpicStatus[]>([])
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([])

  const [ticketId, setTicketId] = useState<number>(0)
  const [checkedList, setCheckedList] = useState<WorkspaceUser[]>([])

  const [enabled, setEnabled] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const { data: workspaceUserList, isLoading: isWorkspaceUserListLoading } =
    useSWR('/v1/workspace-user/search', async (url) => {
      return Get<GetSearchWorkspaceUserListResponse>(url)
    })

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
    const userId = searchParams.get('userId')

    if (!userId || isWorkspaceUserListLoading || !workspaceUserList) return

    const workspaceUser = workspaceUserList.data.data.find(
      (user) => user.user.userId === Number(userId),
    )
    if (workspaceUser) {
      setCheckedList((cur) => [...cur, workspaceUser])
    }
  }, [searchParams.get('userId'), workspaceUserList])

  useEffect(() => {
    const filterList = data?.data?.data
      .filter((item) => item.name.includes(word))
      .filter((item) =>
        checkedList.length === 0
          ? true
          : checkedList.some((_) => _.user.userId === item.worker?.userId),
      )
      .filter((item) =>
        selectedStatus.length === 0
          ? true
          : selectedStatus.includes(item.status),
      )
      .filter((item) =>
        selectedTypeIds.length === 0
          ? true
          : selectedTypeIds.includes(item.ticketSetting?.ticketSettingId),
      )

    if (filterList) {
      setTicketId(filterList.length > 0 ? filterList[0].ticketId : 0)
    }
  }, [data, checkedList])

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
