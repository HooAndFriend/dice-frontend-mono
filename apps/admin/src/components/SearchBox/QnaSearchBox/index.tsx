'use client'

// ** React Imports
import { useState } from 'react'

// ** Component Imports
import Datepicker from 'react-tailwindcss-datepicker'

interface PropsType {}

const QnaSearchBox = ({}: PropsType) => {
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
        <h1 className="mr-4">가입일</h1>
        <div className="w-[250px] mr-8">
          <Datepicker value={value} onChange={handleValueChange} />
        </div>
        <h1 className="mr-4">최근 로그인</h1>
        <div className="w-[250px] mr-8">
          <Datepicker value={value} onChange={handleValueChange} />
        </div>
        <h1 className="mr-4">닉네임</h1>
        <input
          type="text"
          placeholder="닉네임"
          className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
        />
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center">
          <h1 className="mr-8">가입 구분</h1>
          <input type="checkbox" className="mx-2" />
          <h1 className="mr-4">전체</h1>
          <input type="checkbox" className="mx-2" />
          <h1 className="mr-4">일반</h1>
          <input type="checkbox" className="mx-2" />
          <h1 className="mr-4">Microsoft</h1>
          <input type="checkbox" className="mx-2" />
          <h1 className="mr-4">Google</h1>
          <input type="checkbox" className="mx-2" />
          <h1 className="mr-4">Apple</h1>
          <input type="checkbox" className="mx-2" />
          <h1 className="mr-4">Github</h1>
          <input type="checkbox" className="mx-2" />
          <h1 className="mr-4">Twitter</h1>
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

export default QnaSearchBox
