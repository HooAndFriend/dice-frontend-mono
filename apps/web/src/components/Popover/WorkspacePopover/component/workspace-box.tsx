// ** Next Imports
import { WorkspaceState } from '@/src/app'
import CustomImage from '@/src/components/Image/CustomImage'
import { useRecoilValue } from 'recoil'

interface PropsType {
  id: number
  workspaceId: number
  profile: string
  name: string
  onClick: () => void
  handleModalOpen: () => void
}

const WorkspaceBox = ({
  profile,
  name,
  onClick,
  id,
  workspaceId,
  handleModalOpen,
}: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState)
  return (
    <div
      className="flex items-center justify-between mt-5"
      onClick={id === workspaceId ? () => {} : onClick}
    >
      <div className="flex items-center">
        <CustomImage
          className="border rounded-[10px] mr-3"
          src={profile}
          alt="profile"
          width={30}
          height={30}
        />
        <h4 className={`${id === workspaceId && 'text-[#623AD6]'}`}>{name}</h4>
      </div>
      {id === workspaceId && role === 'ADMIN' && (
        <CustomImage
          className="border rounded-[10px] mr-3 cursor-pointer"
          src="/svg/setting.svg"
          alt="setting"
          width={20}
          height={20}
          onClick={handleModalOpen}
        />
      )}
    </div>
  )
}

export default WorkspaceBox
