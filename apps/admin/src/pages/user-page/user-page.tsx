// ** Component Imports
import TitleBox from '@/src/components/TitleBox'
import UserSearchBox from '@/src/components/UserSearchBox'

interface PropsType {}

const UserPageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="사용자 관리 / 사용자 조회" text="사용자 조회" />
      <UserSearchBox />
    </div>
  )
}

export default UserPageView
