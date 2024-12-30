// ** React Imports
import { useState, useCallback } from 'react'

// Recoil Imports
import { WorkspaceState } from '@/src/app'
import { useRecoilValue } from 'recoil'

// ** Components Imports
import EpicItem from '../EpicItem'
import EpicAddItem from '../EpicAddItem'

// ** Type Imports
import { EpicInfo, SelectContent } from '@/src/type/epic'
import useSWRMutation from 'swr/mutation'
import { Patch } from '@/src/repository'
import { CommonResponse } from '@/src/type/common'
import { mutate } from 'swr'

// ** Utils Imports

interface PropsType {
  epicData: EpicInfo[]
  selectContent: SelectContent
  handleClick: (value: SelectContent) => void
}

const EpicTable = ({ epicData, handleClick, selectContent }: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState)
  const [epicId, setEpicId] = useState()
  const [targetEpicId, setTargetEpicId] = useState()

  const onDrag = (item) => {
    setEpicId(item)
  }

  const onDragEnter = (item) => {
    setTargetEpicId(item)
  }

  const onDrop = () => {
    editEpic.trigger()
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
              {epicData.map((item, index) => (
                <EpicItem
                  onDrag={onDrag}
                  onDragEnter={onDragEnter}
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
