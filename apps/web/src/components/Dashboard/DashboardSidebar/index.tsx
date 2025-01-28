'use client'
// ** Next Imports
import { usePathname } from 'next/navigation'

// ** React Imports
import { useMemo } from 'react'

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
    [pathname],
  )

  return (
    <div className="w-[220px] border-r-2 border-[#EBEBEC] pt-[32px]">
      <div className="w-full px-[32px]">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[12px] text-[#6A6F75]">Workspaces</h1>
          <CustomImage
            src="/images/top.png"
            // src={isOpen ? '/images/bottom.png' : '/images/top.png'}
            alt="top"
            width={20}
            height={20}
          />
        </div>
        <WorkspaceList />
      </div>
      <div className="w-full mt-[48px]">
        <div className="flex items-center justify-between w-full px-[32px] mb-[20px]">
          <h1 className="text-[12px] text-[#6A6F75]">Task Managements</h1>
          <CustomImage
            src="/images/top.png"
            // src={isOpen ? '/images/bottom.png' : '/images/top.png'}
            alt="top"
            width={20}
            height={20}
          />
        </div>
        {sidebarMenuList.map((item) => (
          <TicketMenuItem {...item} key={item.id} />
        ))}
      </div>
      <div className="w-full mt-[48px]">
        <div className="flex items-center justify-between w-full px-[32px] mb-[20px]">
          <h1 className="text-[12px] text-[#6A6F75]">Board</h1>
          <CustomImage
            src="/images/top.png"
            // src={isOpen ? '/images/bottom.png' : '/images/top.png'}
            alt="top"
            width={20}
            height={20}
          />
        </div>
        <BoardSidebar />
      </div>
    </div>
  )
}

export default DashboardSidebard
