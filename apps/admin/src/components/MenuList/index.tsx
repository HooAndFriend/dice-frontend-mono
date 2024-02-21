// ** React Imports
import { ReactNode } from 'react'

// ** Component Imports
import DashboardPage from '@/src/pages/dashboard-page'

interface MenuType {
  route: string
  name: string
  element: ReactNode
}

const MenuList: MenuType[] = [
  {
    route: '/',
    name: '대시보드',
    element: <DashboardPage />,
  },
  {
    route: '/user',
    name: '사용자 관리',
    element: <h1>사용자 관리</h1>,
  },
  {
    route: '/team',
    name: '팀 관리',
    element: <h1>팀 관리</h1>,
  },
  {
    route: '/workspace',
    name: '워크스페이스 관리',
    element: <h1>워크스페이스 관리</h1>,
  },
  {
    route: '/cs',
    name: '고객센터 관리',
    element: <h1>고객센터 관리</h1>,
  },
  {
    route: '/manage',
    name: '운영 관리',
    element: <h1>운영 관리</h1>,
  },
]

export default MenuList
