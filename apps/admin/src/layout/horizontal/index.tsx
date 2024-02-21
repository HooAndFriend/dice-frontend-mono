// ** Router Imports
import { Link, useLocation } from 'react-router-dom'

// ** Component Imports
import MenuList from '@/src/components/MenuList'
import ProfileBox from '@/src/components/ProfileBox'
import { useRecoilValue } from 'recoil'
import { AdminState } from '@/src/app/admin'

const HorizontalHeader = () => {
  const { profile, nickname } = useRecoilValue(AdminState)
  const { pathname } = useLocation()

  return (
    <div className="w-full h-[70px] bg-white flex items-center justify-between px-8">
      <div className="flex items-center">
        <img
          src="/images/logo.png"
          width="100px"
          height="30px"
          alt="logo"
          className="mr-12"
        />
        {MenuList.map((item) => (
          <Link to={`/dashboard${item.route}`} key={item.route}>
            <div className="mx-12">
              {`/dashboard${item.route}` === pathname ? (
                <h1 className="text-[#623AD6]">{item.name}</h1>
              ) : (
                <h1>{item.name}</h1>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        <ProfileBox image={profile} />
        <h1 className="ml-[20px] mr-[10px]">{nickname}</h1>
      </div>
    </div>
  )
}

export default HorizontalHeader
