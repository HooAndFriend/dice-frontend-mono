'use client'

// ** React Imports
import { useState } from 'react'

// ** Component Imports
import { DateRange, TeamInfoQuery } from '@/src/type/team'
import Datepicker from 'react-tailwindcss-datepicker'

// ** Utils Imports
import dayjs from 'dayjs'

interface PropsType {
  query: TeamInfoQuery
  onChange: (createdDate: DateRange, teamName: string, createdId: string, description: string) => void
}

const TeamSearchBox = ({ query, onChange }: PropsType) => {
  const [createdDate, setCreatedDate] = useState<DateRange>({
    startDate: query.createdStartDate,
    endDate: query.createdEndDate,
  })
  const [teamName, setTeamName] = useState<string>(query.name)
  const [createdId, setCreatedId] = useState<string>(query.createdId)
  const [description, setDescription] = useState<string>(query.description)

  const handleCreatedDate = (newDate) => {
    setCreatedDate(newDate)
  }
  const handleTeamName = (event) => {
    setTeamName(event.target.value)
  }
  const handleCreatedId = (event) => {
    setCreatedId(event.target.value)
  }
  const handleDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleReset = () => {
    setCreatedDate({ startDate: dayjs().format("YYYY-MM-DD"), endDate: dayjs().set("month", 11).format("YYYY-MM-DD") })
    setTeamName('')
    setCreatedId('')
    setDescription('')
  }
  const handleSearch = () => {
    onChange(createdDate, teamName, createdId, description)
  }

  return (
    <div className="h-[152px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
      <div className="flex items-center">
        <h1 className="mr-4">생성일</h1>
        <div className="w-[250px] mr-8">
          <Datepicker value={createdDate} onChange={handleCreatedDate} />
        </div>
        {/* <h1 className="mr-4">최근 접속일</h1>
        <div className="w-[250px] mr-8">
          <Datepicker value={value} onChange={handleValueChange} />
        </div> */}
        <h1 className="mr-4">팀명</h1>
        <input
          type="text"
          value={teamName}
          onChange={handleTeamName}
          placeholder="팀명"
          className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
        />
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center">
          <h1 className="mr-4">생성자 ID</h1>
          <input
            type="text"
            placeholder="생성자 ID"
            value={createdId}
            onChange={handleCreatedId}
            className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px] mr-8"
          />
          <h1 className="mr-4">설명</h1>
          <input
            type="text"
            placeholder="설명"
            value={description}
            onChange={handleDescription}
            className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
          />
        </div>
        <div className="flex items-center">
          <button
            className="w-[90px] h-[36px] rounded-[8px] bg-[#EFEFEF] mr-4"
            onClick={handleReset}
          >
            초기화
          </button>
          <button
            className="w-[90px] h-[36px] rounded-[8px] bg-[#623AD6] text-white"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamSearchBox
