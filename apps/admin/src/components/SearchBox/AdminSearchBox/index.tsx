'use client'

// ** React Imports
import { useState } from 'react'

// ** Component Imports
import Datepicker from 'react-tailwindcss-datepicker'
import CustomSelect from '../../CustomInput/CustomSelect'

interface PropsType {}

const AdminSearchBox = ({}: PropsType) => {
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
        <h1 className="mr-4">이름</h1>
        <input
          type="text"
          placeholder="이름"
          className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
        />
        <h1 className="mr-4">이메일</h1>
        <input
          type="text"
          placeholder="이메일"
          className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
        />
        <h1 className="mr-4">연락처</h1>
        <input
          type="text"
          placeholder="연락처"
          className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
        />
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center">
          <h1 className="mr-4">권한</h1>
          <CustomSelect option="권한" />
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

export default AdminSearchBox
