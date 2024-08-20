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
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

interface PropsType {
  epicData: EpicInfo[]
  updateOrder: (arg: { epicId: number; targetEpicId: number }) => void
  handleClick: (value: SelectContent) => void
}

const EpicTable = ({ epicData, handleClick, updateOrder }: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState)
  const [items, setItems] = useState(epicData)

  const moveEpicItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedItem = items[dragIndex]
      const updatedItems = update(items, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedItem],
        ],
      })
      setItems(updatedItems)

      updateOrder({
        epicId: draggedItem.epicId,
        targetEpicId: updatedItems[hoverIndex].epicId,
      })
    },
    [items],
  )

  return (
    <div className="w-full h-full bg-white rounded-[8px] scrollbar-thumb-slate-700 scrollbar-track-slate-300">
      <div className="relative w-full h-full overflow-y-scroll scrollbar-thin">
        <div className="w-full h-full">
          <DndProvider backend={HTML5Backend}>
            <table className="w-full text-sm caption-bottom">
              <tbody className="[&amp;_tr:last-child]:border-0">
                {items.map((item, index) => (
                  <EpicItem
                    key={item.epicId}
                    index={item.orderId}
                    item={item}
                    word=""
                    moveItem={moveEpicItem}
                    handleClick={handleClick}
                  />
                ))}
                {role !== 'VIEWER' && <EpicAddItem />}
              </tbody>
            </table>
          </DndProvider>
        </div>
      </div>
    </div>
  )
}

export default EpicTable
