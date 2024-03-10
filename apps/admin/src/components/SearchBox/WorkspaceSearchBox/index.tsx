'use client'

// ** React Imports
import { useState } from 'react'

// ** Component Imports
import Datepicker from 'react-tailwindcss-datepicker'

interface PropsType {}

const WorkspaceSearchBox = ({}: PropsType) => {
  const [value, setValue] = useState<any>({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  })

  const handleValueChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <div className="h-[152px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
      <div className="flex items-center">
        <h1 className="mr-4">생성일</h1>
        <div className="w-[250px] mr-8">
          <Datepicker value={value} onChange={handleValueChange} />
        </div>
        <h1 className="mr-4">최근 접속일</h1>
        <div className="w-[250px] mr-8">
          <Datepicker value={value} onChange={handleValueChange} />
        </div>
        <h1 className="mr-4">워크스페이스명</h1>
        <input
          type="text"
          placeholder="워크스페이스명"
          className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
        />
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center">
          <h1 className="mr-4">생성자 ID</h1>
          <input
            type="text"
            placeholder="생성자 ID"
            className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px] mr-8"
          />
          <h1 className="mr-4">설명</h1>
          <input
            type="text"
            placeholder="설명"
            className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
          />
        </div>
        <div className="flex items-center">
          <button className="w-[90px] h-[36px] rounded-[8px] bg-[#EFEFEF] mr-4">
            초기화
          </button>
          <button className="w-[90px] h-[36px] rounded-[8px] bg-[#623AD6] text-white">
            검색
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceSearchBox
