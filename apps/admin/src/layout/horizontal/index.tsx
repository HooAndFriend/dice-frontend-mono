// ** Router Imports
import { Link, useLocation } from 'react-router-dom'

// ** Component Imports
import { MenuList } from '@/src/components/MenuList'
import ProfileBox from '@/src/components/ProfileBox'
import MenuDropDown from '@/src/components/MenuDropDown'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { AdminState } from '@/src/app/admin'
import ProfileDropDown from '@/src/components/ProfileDropDown'

const HorizontalHeader = () => {
  const { profile, nickname } = useRecoilValue(AdminState)
  const { pathname } = useLocation()

  return (
    <div className="w-full h-[70px] bg-white flex items-center justify-between px-8">
      <div className="flex items-center">
        <Link to="/dashboard">
          <img
            src="/images/logo.png"
            width="100px"
            height="30px"
            alt="logo"
            className="mr-12"
          />
        </Link>
        {MenuList.map((item) => (
          <MenuDropDown
            name={item.name}
            route={item.route}
            pathname={pathname}
            children={item.children}
            key={item.route}
          />
        ))}
      </div>
      <div className="flex items-center">
        <ProfileBox image={profile} />
        <ProfileDropDown name={nickname} />
      </div>
    </div>
  )
}

export default HorizontalHeader
