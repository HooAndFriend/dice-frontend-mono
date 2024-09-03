'use client'
// ** React Imports
import { useState } from 'react'

// ** Component Imports
import KanbanContainer from '@/src/container/kanban-container'

// ** Service Imports
import useSWR from 'swr'
import { Get } from '@/src/repository'

// ** Type Imports
import { GetTicketListResponse } from '@/src/type/ticket'
import { WorkspaceUser } from '@/src/type/workspace'

const KanbanPage = () => {
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([])
  const [word, setWord] = useState<string>('')
  const [selectedEpicIds, setSelectedEpicIds] = useState<number[]>([])
  const [checkedList, setCheckedList] = useState<WorkspaceUser[]>([])

  const handleTypeSelectFilter = (typeId: number) => {
    if (selectedTypeIds.includes(typeId)) {
      setSelectedTypeIds((c) => c.filter((id) => id !== typeId))
    } else {
      setSelectedTypeIds((c) => [...c, typeId])
    }
  }

  const {
    data,
    error,
    isLoading,
    mutate: handleTicketRefetch,
  } = useSWR('/v1/ticket', async (url) => Get<GetTicketListResponse>(url))

  if (error) return

  return (
    <KanbanContainer
      data={
        isLoading
          ? []
          : data.data.data
              .filter((item) => item.name.includes(word))
              .filter((item) =>
                checkedList.length === 0
                  ? true
                  : checkedList.some(
                      (_) => _.user.userId === item.worker?.userId,
                    ),
              )

              .filter((item) =>
                selectedTypeIds.length === 0
                  ? true
                  : selectedTypeIds.includes(
                      item.ticketSetting?.ticketSettingId,
                    ),
              )
      }
      word={word}
      checkedList={checkedList}
      selectedEpicIds={selectedEpicIds}
      selectedTypeIds={selectedTypeIds}
      handleTypeSelectFilter={handleTypeSelectFilter}
      setCheckedList={setCheckedList}
      handleWord={(e) => setWord(e.target.value)}
    />
  )
}

export default KanbanPage
