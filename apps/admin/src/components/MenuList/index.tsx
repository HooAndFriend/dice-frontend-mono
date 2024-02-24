// ** React Imports
import { ReactNode } from 'react'

// ** Component Imports
import DashboardPage from '@/src/pages/dashboard-page'
import UserPage from '@/src/pages/user-page'
import TeamPage from '@/src/pages/team-page'
import WorkspacePage from '@/src/pages/workspace-page'
import CsPage from '@/src/pages/cs-page'
import ManagePage from '@/src/pages/manage-page'

export interface MenuType {
  route: string
  name: string
  element: ReactNode
  children: MenuType[]
}

const MenuList: MenuType[] = [
  {
    route: '/',
    name: '대시보드',
    element: <DashboardPage />,
    children: [],
  },
  {
    route: '/user',
    name: '사용자 관리',
    element: <UserPage />,
    children: [
      {
        route: '/user',
        name: '사용자 조회',
        element: <UserPage />,
        children: [],
      },
      {
        route: '/user/delete',
        name: '탈퇴 사용자 조회',
        element: <UserPage />,
        children: [],
      },
    ],
  },
  {
    route: '/team',
    name: '팀 관리',
    element: <TeamPage />,
    children: [],
  },
  {
    route: '/workspace',
    name: '워크스페이스 관리',
    element: <WorkspacePage />,
    children: [],
  },
  {
    route: '/cs',
    name: '고객센터 관리',
    element: <CsPage />,
    children: [
      {
        route: '/cs',
        name: '1:1 문의 조회',
        element: <CsPage />,
        children: [],
      },
      {
        route: '/cs/faq',
        name: '자주 묻는 질문',
        element: <CsPage />,
        children: [],
      },
    ],
  },
  {
    route: '/manage',
    name: '운영 관리',
    element: <ManagePage />,
    children: [
      {
        route: '/manage',
        name: '프로그램 버전',
        element: <CsPage />,
        children: [],
      },
      {
        route: '/manage/state',
        name: '상태값 관리',
        element: <CsPage />,
        children: [],
      },
      {
        route: '/manage/admin',
        name: '관리자 목록',
        element: <CsPage />,
        children: [],
      },
      {
        route: '/manage/authoriy',
        name: '권한 관리',
        element: <CsPage />,
        children: [],
      },
    ],
  },
]

export default MenuList
