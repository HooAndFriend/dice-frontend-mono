'use client'
// ** Next Imports
import { usePathname } from 'next/navigation'

// ** React Imports
import { useMemo } from 'react'

// ** Component Imports
import TicketMenuItem from '../TicketMenuItem'
import TicketIcon from '@/public/svg/ticket-icon.svg'
import EpicIcon from '@/public/svg/epic-icon.svg'
import SettintIcon from '@/public/svg/ticket-setting.svg'
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

const TicketSidebar = () => {
  const pathname = usePathname()

  const { uuid } = useRecoilValue(WorkspaceState)

  const sidebarMenuList = useMemo(
    () =>
      [
        {
          id: 1,
          name: 'Gantt',
          link: `/${uuid}/dashboard/task`,
          icon: EpicIcon,
          isClicked: false,
        },
        {
          id: 2,
          name: 'Sprint',
          link: `/${uuid}/dashboard/task/sprint`,
          icon: TicketIcon,
          isClicked: false,
        },
        {
          id: 3,
          name: 'Kanban',
          link: `/${uuid}/dashboard/task/kanban`,
          icon: TicketIcon,
          isClicked: false,
        },
        {
          id: 4,
          name: 'Epic',
          link: `/${uuid}/dashboard/task/epic`,
          icon: TicketIcon,
          isClicked: false,
        },
        {
          id: 5,
          name: 'Setting',
          link: `/${uuid}/dashboard/task/setting`,
          icon: SettintIcon,
          isClicked: false,
        },
      ].map((item) => {
        if (item.link === pathname) {
          return { ...item, isClicked: true }
        }
        return item
      }),
    [pathname],
  )

  return (
    <div className="w-[180px] bg-white border-r-2 border-[#EBEBEC]">
      <div className="flex justify-center h-4/5">
        <div className="w-full">
          {sidebarMenuList.map((item) => (
            <TicketMenuItem {...item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TicketSidebar
