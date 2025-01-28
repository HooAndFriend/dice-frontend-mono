// ** Next Imports
import { usePathname, useRouter } from 'next/navigation'

// ** Component Imports
import WorkspaceListView from './workspace-list'

// ** Recoil Imports
import { WorkspaceState } from '@/src/app'
import { useRecoilState } from 'recoil'

// ** Service Imports
import useSWR from 'swr'
import { Get } from '@/src/repository'

// ** Type Imports
import { GetWorkspaceListResponse, WorkspaceInfo } from '@/src/type/workspace'

const WorkspaceList = () => {
  const pathname = usePathname()
  const router = useRouter()

  const [workspaceState, setWorkspaceState] = useRecoilState(WorkspaceState)

  const {
    data,
    error,
    isLoading,
    mutate: handleRefetch,
  } = useSWR('/v1/workspace-user/workspace', async (url) =>
    Get<GetWorkspaceListResponse>(url),
  )

  const handleUpdateWorkspace = (item: WorkspaceInfo) => {
    setWorkspaceState({
      workspaceId: item.workspaceUserId,
      name: item.workspace.name,
      profile: item.workspace.profile,
      uuid: item.workspace.uuid,
      role: item.role,
    })

    const newPath = `/${item.workspace.uuid}/dashboard`

    // const newPath = pathname.replace(
    //   /\/[^\/]+\/dashboard/,
    //   `/${item.workspace.uuid}/dashboard`,
    // )

    router.push(newPath)
  }

  if (isLoading || error) return

  return (
    <WorkspaceListView
      data={data.data.data}
      handleUpdateWorkspace={handleUpdateWorkspace}
      workspace={workspaceState}
    />
  )
}

export default WorkspaceList
