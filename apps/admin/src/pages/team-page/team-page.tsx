// ** React Imports
import { useRef, useState } from 'react'

// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import TeamSearchBox from '@/src/components/SearchBox/TeamSearchBox'
import TeamModal from '@/src/components/Modal/TeamModal'
// ** Utils Imports
import dayjs from 'dayjs'

// ** Type Imports
import { DateRange, TeamInfo, TeamInfoQuery } from '@/src/type/team'

interface PropsType {
  query: TeamInfoQuery
  count: number
  teamData: TeamInfo[]
  handleSearch: (createdDate: DateRange, teamName: string, createdId: string, description: string) => void
  handlePage: (page: number) => void
}

const TeamPageView = ({ query, count, teamData, handleSearch, handlePage }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)
  const cancelButtonRef = useRef(null)

  const handleOpen = () => setOpen((c) => !c)

  const bodyData = teamData.map((team, index) => [
    { name: team.team_id.toString(), size: '0%' },
    { name: (index + 1).toString(), size: '5%' },
    { name: team.team_name, size: '15%' },
    { name: team.team_createdId, size: '25%' },
    { name: team.team_description, size: '15%' },
    { name: dayjs(team.team_created_date).format("YYYY-MM-DD HH:mm:ss"), size: '15%' },
    // { name: '2024-01-01 23:10:12', size: '15%' },
    { name: team.teamUserCount, size: '10%' },
    { name: team.workspaceCount, size: '15%' },
  ])

  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="팀 관리 / 팀 조회" text="팀 조회" />
      <TeamSearchBox
        query={query}
        onChange={handleSearch}
      />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <h1 className="mb-8 font-bold">팀 목록({count})</h1>
        <CustomTable
          headerData={headerData}
          ids={teamData.map(team => team.team_id)}
          bodyData={bodyData}
          disabledClick={false}
          handleClick={handleOpen}
        />
        <div className="flex justify-end w-full">
          <TablePagination count={count} pageSize={query.pageSize} handlePage={handlePage} />
        </div>
        {open && (
          <TeamModal
            open={open}
            setOpen={setOpen}
            cancelButtonRef={cancelButtonRef}
          />
        )}
      </div>
    </div>
  )
}

export default TeamPageView

const headerData = [
  { name: '번호', size: '5%' },
  { name: '팀명', size: '15%' },
  { name: '생성자 ID', size: '25%' },
  { name: '설명', size: '15%' },
  { name: '생성일', size: '15%' },
  // { name: '최근 접속일', size: '15%' },
  { name: '소속 멤버 수', size: '10%' },
  { name: '소속 워크스페이스 수', size: '15%' },
]