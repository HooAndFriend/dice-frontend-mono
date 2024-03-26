'use client'

// ** React Imports
import { useState } from 'react'

// ** Component Imports
import Datepicker from 'react-tailwindcss-datepicker'
import CustomCheckbox from '../../CustomInput/CustomCheckbox'

// ** Type Imports
import { DateRange, UserInfoQuery } from '@/src/type/user'
import { DeleteUserQuery } from '@/src/type/user-delete';


interface PropsType {
  searchData: string[]
  query: UserInfoQuery | DeleteUserQuery
  onChange: (createdDate: DateRange, lastLoginDate: DateRange, nickname: string, types: string[]) => void;
}

const defaultDate = () => {
  return { startDate: '2024-01-01', endDate: new Date().toLocaleDateString() };
}

const CheckboxItem = [
  { value: "전체", label: "전체" },
  { value: "DICE", label: "일반" },
  { value: "MICROSOFT", label: "Microsoft" },
  { value: "GOOGLE", label: "Google" },
  { value: "APPLE", label: "Apple" },
  { value: "GITHUB", label: "Github" },
  { value: "TWITTER", label: "Twitter" },
];

const UserSearchBox = ({ searchData, query, onChange }: PropsType) => {
  const [createdDate, setCreatedDate] = useState<DateRange>({
    startDate: query.createdStartDate,
    endDate: query.createdEndDate
  })
  const [lastLoginDate, setLastLoginDate] = useState<DateRange>({
    startDate: (query as UserInfoQuery).lastLoginStartDate || (query as DeleteUserQuery).deletedStartDate,
    endDate: (query as UserInfoQuery).lastLoginEndDate || (query as DeleteUserQuery).deletedEndDate
  })
  const [nickname, setNickname] = useState(query.nickname);
  const [types, setTypes] = useState<string[]>(query.type);
 
  const handleCreatedDate = (newDate) => { setCreatedDate(newDate); }
  const handleLastLoginDate = (newDate) => { setLastLoginDate(newDate); }
  const handleNickName = (event) => { setNickname(event.target.value); }
  const handleTypes = (selectedValues: string[]) => { setTypes(selectedValues); };

  const handleReset = () => {
    setCreatedDate(defaultDate);
    setLastLoginDate(defaultDate);
    setNickname('');
    setTypes([]);
  };

  const handleSearch = () => {
    onChange(createdDate, lastLoginDate, nickname, types)
  }

  return (
    <div className="h-[152px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
      <div className="flex items-center">
        <h1 className="mr-4">{searchData[0]}</h1>
        <div className="w-[250px] mr-8">
          <Datepicker value={createdDate} onChange={handleCreatedDate} />
        </div>
        <h1 className="mr-4">{searchData[1]}</h1>
        <div className="w-[250px] mr-8">
          <Datepicker value={lastLoginDate} onChange={handleLastLoginDate} />
        </div>
        <h1 className="mr-4">닉네임</h1>
        <input
          name='nickname'
          value={nickname}
          onChange={handleNickName}
          type="text"
          placeholder="닉네임"
          className="w-[400px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
        />
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center">
          <h1 className="mr-8">가입 구분</h1>
          <CustomCheckbox
            item={CheckboxItem}
            name='type'
            value={types}
            onChange={handleTypes}
          />
        </div>
        <div className="flex items-center">
          <button className="w-[90px] h-[36px] rounded-[8px] bg-[#EFEFEF] mr-4" onClick={handleReset}>
            초기화
          </button>
          <button className="w-[90px] h-[36px] rounded-[8px] bg-[#623AD6] text-white" onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserSearchBox
