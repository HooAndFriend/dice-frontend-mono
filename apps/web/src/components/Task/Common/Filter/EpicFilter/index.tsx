import { useEffect, useRef, useState, ChangeEvent } from 'react'
import useSWR from 'swr'
import { Get } from '@/src/repository'
import { GetEpicListResponse } from '@/src/type/epic'

interface PropsType {
  selectedEpicIds: number[]
  handleEpicSelectFilter: (id: number) => void
}

const EpicFilter = ({ selectedEpicIds, handleEpicSelectFilter }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const { data, isLoading } = useSWR('/v1/epic/list', async (url) =>
    Get<GetEpicListResponse>(url),
  )

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleOpen = () => {
    setOpen((c) => !c)
  }

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', clickOutside)
    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <div
        className="border border-[#EBEBEC] rounded-[10px] bg-white flex items-center cursor-pointer w-[150px] h-[30px] justify-between px-[8px]"
        onClick={(e) => {
          e.stopPropagation()
          handleOpen()
        }}
      >
        <h1 className="text-[#EBEBEC]">Epic</h1>
        <div className="flex items-center space-x-2">
          {selectedEpicIds.length > 0 && (
            <div className="ml-[5px] w-[20px] text-[12px] h-[20px] rounded-[10px] bg-[#623AD6] flex items-center justify-center text-white">
              {selectedEpicIds.length}
            </div>
          )}
          <img src="/svg/arrow-down.svg" alt="arrow" />
        </div>
      </div>
      {open && (
        <div
          className="absolute w-[302px] h-[200px] bg-white shadow-lg top-[50px] left-0 rounded-[8px] overflow-y-auto z-10"
          ref={dropdownRef}
        >
          <div className="flex items-center justify-center w-full px-2 py-2">
            <input
              type="text"
              className="w-full h-8 border-none focus:outline-none"
              value={name}
              onChange={handleName}
              placeholder="Search.."
            />
          </div>
          <hr className="w-full" />
          <div className="px-[8px] py-[8px]">
            {isLoading
              ? []
              : data.data.data
                  .filter((epic) =>
                    epic.name.toLowerCase().includes(name.toLowerCase()),
                  )
                  .map((epic) => (
                    <div className="flex items-center mb-4" key={epic.epicId}>
                      <input
                        id={`checkbox-${epic.epicId}`}
                        type="checkbox"
                        checked={selectedEpicIds.includes(epic.epicId)}
                        onChange={() => handleEpicSelectFilter(epic.epicId)}
                        className="w-[12px] h-[12px] text-blue-600 bg-gray-100 border-gray-300 rounded-[3px] focus:ring-2"
                      />
                      <label
                        htmlFor={`checkbox-${epic.epicId}`}
                        className="text-sm font-medium text-gray-900 ms-2"
                      >
                        {epic.name}
                      </label>
                    </div>
                  ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default EpicFilter
