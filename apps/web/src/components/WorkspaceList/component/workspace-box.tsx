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
}

const WorkspaceBox = ({
  profile,
  name,
  onClick,
  id,
  workspaceId,
}: PropsType) => {
  return (
    <div
      className="flex items-center justify-between mb-[16px]"
      onClick={id === workspaceId ? () => {} : onClick}
    >
      <div className="flex items-center">
        <CustomImage
          className="border rounded-[6px] mr-[16px]"
          src={profile}
          alt="profile"
          width={24}
          height={24}
        />
        <h4 className={`${id === workspaceId && 'text-[#623AD6]'} text-[12px]`}>
          {name}
        </h4>
      </div>
    </div>
  )
}

export default WorkspaceBox
