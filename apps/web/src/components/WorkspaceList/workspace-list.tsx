// ** Type Imports
import { WorkspaceInfo } from '@/src/type/workspace'
import { WorkspaceStateType } from '@/src/app'

// ** Component Imports
import WorkspaceBox from './component/workspace-box'
import Link from 'next/link'

interface PropsType {
  data: WorkspaceInfo[]
  workspace: WorkspaceStateType
  handleUpdateWorkspace: (item: WorkspaceInfo) => void
}

const WorkspacePopoverView = ({
  data,
  workspace,
  handleUpdateWorkspace,
}: PropsType) => {
  return (
    <>
      <div>
        <div className="py-3 cursor-pointer">
          {data.map((item) => (
            <WorkspaceBox
              key={item.workspaceUserId}
              id={item.workspaceUserId}
              workspaceId={workspace.workspaceId}
              profile={item.workspace.profile}
              name={item.workspace.name}
              onClick={() => handleUpdateWorkspace(item)}
            />
          ))}
          <Link href="/save-workspace">
            <div className="w-full h-[36px] border-dashed rounded-[3px] border-[#CACED3] border-[1px] flex justify-between items-center cursor-pointer px-[28px]">
              <h1 className="text-[10px] text-[#6A6F75]">+</h1>
              <h1 className="text-[10px] text-[#6A6F75]">New Workspaces</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default WorkspacePopoverView
