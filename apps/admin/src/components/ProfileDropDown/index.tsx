'use client'

// ** React Imports
import { Fragment } from 'react'

// ** Router Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Ui Imports
import { Menu, Transition } from '@headlessui/react'

// ** Recoil Imports
import { useSetRecoilState } from 'recoil'
import { AuthState, AuthDefaultState } from '@/src/app/auth'
import { AdminState, AdminDefaultState } from '@/src/app/admin'

interface PropsType {
  name: string
}

const ProfileDropDown = ({ name }: PropsType) => {
  const navigate = useNavigate()

  const setAuthState = useSetRecoilState(AuthState)
  const setAdminState = useSetRecoilState(AdminState)

  const handleLogout = () => {
    setAuthState(AuthDefaultState)
    setAdminState(AdminDefaultState)
    navigate('/')
  }

  return (
    <Menu as="div" className="relative inline-block ml-2 text-left">
      <Menu.Button className="inline-flex justify-center w-full px-3 py-2">
        <h1>{name}</h1>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 w-56 mt-2 origin-top-right bg-white rounded-[12px] shadow-lg -right-20 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link to="/dashboard/profile">
                <p className="px-4 py-2">설정</p>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <p className="px-4 py-2" onClick={handleLogout}>
                로그아웃
              </p>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileDropDown
