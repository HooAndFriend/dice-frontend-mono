// ** React Imports
import { useEffect, useState } from 'react'

// Recoil Imports
import { WorkspaceState } from '@/src/app'
import { useRecoilValue } from 'recoil'

// ** Components Imports
import EpicItem from '../EpicItem'
import EpicAddItem from '../EpicAddItem'

// ** Type Imports
import { EpicInfo, SelectContent } from '@/src/type/epic'

// ** Utils Imports
import useSWRMutation from 'swr/mutation'
import { Patch } from '@/src/repository'
import { CommonResponse } from '@/src/type/common'
import { mutate } from 'swr'

interface PropsType {
  epicData: EpicInfo[]
  selectContent: SelectContent
  handleClick: (value: SelectContent) => void
}

const EpicTable = ({ epicData, handleClick, selectContent }: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState)
  const [localEpicData, setLocalEpicData] = useState(epicData)
  const [epicId, setEpicId] = useState<number>(null)
  const [targetEpicId, setTargetEpicId] = useState<number>()

  useEffect(() => {
    setLocalEpicData(epicData)
  }, [epicData])

  const onDragStart = (id: number) => {
    setEpicId(id)
  }

  const onDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    targetId: number,
  ) => {
    event.preventDefault()
    if (epicId && epicId !== targetId) {
      const updatedData = reorderEpicData(localEpicData, epicId, targetId)
      setLocalEpicData(updatedData)
      setTargetEpicId(targetId)
    }
  }

  const onDrop = () => {
    editEpic.trigger()
  }

  const reorderEpicData = (
    data: EpicInfo[],
    sourceId: number,
    targetId: number,
  ) => {
    const sourceIndex = data.findIndex((item) => item.epicId === sourceId)
    const targetIndex = data.findIndex((item) => item.epicId === targetId)
    const updatedData = [...data]
    const [removed] = updatedData.splice(sourceIndex, 1)
    updatedData.splice(targetIndex, 0, removed)
    return updatedData
  }

  const editEpic = useSWRMutation(
    '/v1/epic/order',
    async (url: string) =>
      await Patch<CommonResponse<void>>(url, { epicId, targetEpicId }),
    {
      onSuccess: () => {
        mutate('/v1/epic')
      },
      onError: (error) => {},
    },
  )

  return (
    <div className="w-full h-full bg-white rounded-[8px] scrollbar-thumb-slate-700 scrollbar-track-slate-300">
      <div className="relative w-full h-full overflow-y-scroll scrollbar-thin">
        <div className="w-full h-full">
          <table className="w-full text-sm caption-bottom">
            <tbody className="[&amp;_tr:last-child]:border-0">
              {localEpicData.map((item, index) => (
                <EpicItem
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  selectContent={selectContent}
                  key={item.epicId}
                  item={item}
                  handleClick={handleClick}
                />
              ))}
              {role !== 'VIEWER' && <EpicAddItem />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EpicTable
