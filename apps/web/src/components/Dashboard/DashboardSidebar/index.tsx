'use client'
// ** Next Imports
import { usePathname } from 'next/navigation'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Component Imports
import MenuItem from '../../MenuItem'
import WorkspacePopover from '../../Popover/WorkspacePopover'
import { MenuList } from '@/src/constants/menu'
import DashboardIcon from '@/public/svg/dashboard.svg'
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

const DashboardSidebard = () => {
  const [path, setPath] = useState<string>('/')
  const [sidbarMenuList, setSidbarMenuList] = useState([])

  const { uuid } = useRecoilValue(WorkspaceState)

  const pathname = usePathname()

  useEffect(() => {
    const pathArray = pathname.split('/')

    setPath(pathArray[3] ? `/${pathArray[3]}` : '/')
  }, [pathname])

  useEffect(() => {
    const arr = [
      {
        id: 0,
        name: 'DASHBOARD',
        link: '/',
        icon: DashboardIcon,
        isClicked: false,
      },
      ,
      ...MenuList,
    ].map((item) => {
      if ('/' + item.link.split('/')[1] === path) {
        return {
          ...item,
          isClicked: true,
          link: `/${uuid}/dashboard${item.link}`,
        }
      }
      return {
        ...item,
        link: `/${uuid}/dashboard${item.link}`,
      }
    })

    setSidbarMenuList(arr)
  }, [path])

  return (
    <div className="w-[70px] border-r-2 border-[#EBEBEC]">
      <div className="flex justify-center h-4/5">
        <div>
          <WorkspacePopover />
          {sidbarMenuList.map((item) => (
            <MenuItem {...item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebard
