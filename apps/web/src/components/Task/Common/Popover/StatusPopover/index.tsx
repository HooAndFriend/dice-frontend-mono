import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// ** Type Imports
import { EpicStatus } from '@/src/type/epic'

// ** Utils Imports
import { getStateBoxColor } from '@/src/utils/color'

export const StatusList: EpicStatus[] = [
  'WAITING',
  'DOING',
  'DONE',
  'COMPLETE',
  'HOLD',
  'REOPEN',
  'NOTHING',
]

interface PropsType {
  status: EpicStatus
  open: boolean
  handleStatus: (status: EpicStatus) => void
  handleOpen: () => void
}

const StatusPopover = ({
  status,
  open,
  handleStatus,
  handleOpen,
}: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleOpen()
      }
    }

    document.addEventListener('mousedown', clickOutside)

    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [])

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPosition({ x: e.clientX, y: e.clientY }) // 마우스 위치 저장
    handleOpen()
  }

  return (
    <div className="relative">
      <button
        className="w-[84px] h-[30px] rounded-[6px] flex justify-center text-[12px] items-center text-white font-spoqa"
        style={{ backgroundColor: getStateBoxColor(status) }}
        onClick={handleButtonClick}
      >
        {status}
      </button>
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute w-[184px] bg-white shadow-lg rounded-[8px] z-[9999]"
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y + 10,
              transform: 'translateX(-50%)',
            }}
          >
            {StatusList.map((item) => (
              <div
                className="flex items-center justify-center px-[5px] py-[8px]"
                key={item}
              >
                <div
                  className="w-[168px] cursor-pointer h-[32px] py-[10px] rounded-[8px] px-[8px] flex items-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStatus(item)
                  }}
                  style={{
                    backgroundColor: status === item ? '#F4F4FA' : 'white',
                  }}
                >
                  <div
                    className="w-[12px] h-[12px] rounded-[3px]"
                    style={{ backgroundColor: getStateBoxColor(item) }}
                  />
                  <p
                    className="text-[12px] ml-[13px]"
                    style={{ color: status === item ? 'black' : '#ACACAC' }}
                  >
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  )
}

export default StatusPopover
