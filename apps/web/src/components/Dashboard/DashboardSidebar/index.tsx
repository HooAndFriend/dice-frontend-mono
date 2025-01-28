'use client'
// ** Next Imports
import { usePathname } from 'next/navigation'

// ** React Imports
import { useMemo, useState } from 'react'

// ** Component Imports
import WorkspaceList from '../../WorkspaceList'
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'
import CustomImage from '../../Image/CustomImage'
import DashboardIcon from '@/public/svg/sidebar/dashboard.svg'
import EpicIcon from '@/public/svg/sidebar/epic.svg'
import KanbanIcon from '@/public/svg/sidebar/kanban.svg'
import IssueIcon from '@/public/svg/sidebar/issue.svg'
import SettintIcon from '@/public/svg/sidebar/setting.svg'
import SelectDashboardIcon from '@/public/svg/sidebar/select-dashboard.svg'
import SelectEpicIcon from '@/public/svg/sidebar/select-epic.svg'
import SelectKanbanIcon from '@/public/svg/sidebar/select-kanban.svg'
import SelectIssueIcon from '@/public/svg/sidebar/select-issue.svg'
import SelectSettintIcon from '@/public/svg/sidebar/select-setting.svg'
import TicketMenuItem from '../TicketMenuItem'
import BoardSidebar from '../BoardSidebar'

const getTaskMenuList = (uuid: string) => [
  {
    id: 1,
    label: 'Dash board',
    link: `/${uuid}/dashboard`,
    icon: DashboardIcon,
    selectIcon: SelectDashboardIcon,
    isOpen: false,
  },
  {
    id: 2,
    label: 'Epic',
    link: `/${uuid}/dashboard/task/epic`,
    icon: EpicIcon,
    selectIcon: SelectEpicIcon,
    isOpen: false,
  },
  {
    id: 3,
    label: 'Kanban',
    link: `/${uuid}/dashboard/task/kanban`,
    icon: KanbanIcon,
    selectIcon: SelectKanbanIcon,
    isOpen: false,
  },
  {
    id: 4,
    label: 'Issue',
    link: `/${uuid}/dashboard/task/issue`,
    icon: IssueIcon,
    selectIcon: SelectIssueIcon,
    isOpen: false,
  },
  {
    id: 5,
    label: 'Setting',
    link: `/${uuid}/dashboard/task/setting`,
    icon: SettintIcon,
    selectIcon: SelectSettintIcon,
    isOpen: false,
  },
]

const DashboardSidebard = () => {
  const [open, setOpen] = useState({
    workspace: true,
    task: true,
    board: true,
  })
  const { uuid } = useRecoilValue(WorkspaceState)

  const pathname = usePathname()

  const sidebarMenuList = useMemo(
    () =>
      pathname
        ? getTaskMenuList(uuid).map((item) => {
            if (item.link === pathname) {
              return { ...item, isOpen: true }
            }
            return item
          })
        : getTaskMenuList(uuid),
    [pathname, uuid],
  )

  return (
    <div className="w-[220px] h-screen border-r border-[#EBEBEC] bg-white pt-8 overflow-y-auto">
      {/* Workspaces Section */}
      <div className="w-full px-8">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[12px] text-[#6A6F75]">Workspaces</h1>
          <CustomImage
            onClick={() => setOpen({ ...open, workspace: !open.workspace })}
            className="cursor-pointer"
            src={open.workspace ? '/images/down.png' : '/images/top.png'}
            alt="toggle"
            width={20}
            height={20}
          />
        </div>
        {open.workspace && <WorkspaceList />}
      </div>

      {/* Task Management Section */}
      <div className="w-full mt-[48px]">
        <div className="flex items-center justify-between w-full px-8 mb-[20px]">
          <h1 className="text-[12px] text-[#6A6F75]">Task Managements</h1>
          <CustomImage
            onClick={() => setOpen({ ...open, task: !open.task })}
            src={open.task ? '/images/down.png' : '/images/top.png'}
            alt="toggle"
            width={20}
            height={20}
          />
        </div>
        {open.task &&
          sidebarMenuList.map((item) => (
            <TicketMenuItem {...item} key={item.id} />
          ))}
      </div>

      {/* Board Section */}
      <div className="w-full mt-[48px]">
        <div className="flex items-center justify-between w-full px-8 mb-[20px]">
          <h1 className="text-[12px] text-[#6A6F75]">Board</h1>
          <CustomImage
            onClick={() => setOpen({ ...open, board: !open.board })}
            src={open.board ? '/images/down.png' : '/images/top.png'}
            alt="toggle"
            width={20}
            height={20}
          />
        </div>
        {open.board && <BoardSidebar />}
      </div>
    </div>
  )
}

export default DashboardSidebard
