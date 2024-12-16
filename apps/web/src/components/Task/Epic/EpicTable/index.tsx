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

// ** Utils Imports

interface PropsType {
  epicData: EpicInfo[]
  selectContent: SelectContent
  handleClick: (value: SelectContent) => void
}

const EpicTable = ({ epicData, handleClick, selectContent }: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState)

  return (
    <div className="w-full h-full bg-white rounded-[8px] scrollbar-thumb-slate-700 scrollbar-track-slate-300">
      <div className="relative w-full h-full overflow-y-scroll scrollbar-thin">
        <div className="w-full h-full">
          <table className="w-full text-sm caption-bottom">
            <tbody className="[&amp;_tr:last-child]:border-0">
              {epicData.map((item, index) => (
                <EpicItem
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
