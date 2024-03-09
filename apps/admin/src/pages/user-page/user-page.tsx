// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import UserSearchBox from '@/src/components/UserSearchBox'

interface PropsType {}

const UserPageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="사용자 관리 / 사용자 조회" text="사용자 조회" />
      <UserSearchBox />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <h1 className="mb-8 font-bold">사용자 목록(30명)</h1>
        <CustomTable />
        <div className="flex justify-end w-full">
          <TablePagination />
        </div>
      </div>
    </div>
  )
}

export default UserPageView
