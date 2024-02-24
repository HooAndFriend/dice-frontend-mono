// ** React Imports
import { Fragment } from 'react'

// ** Router Imports
import { Link } from 'react-router-dom'

// ** Ui Imports
import { Menu, Transition } from '@headlessui/react'
import { MenuType } from '../MenuList'

interface PropsType {
  name: string
  route: string
  pathname: string
  children: MenuType[]
}

const MenuDropDown = ({ name, children, route, pathname }: PropsType) => {
  if (name === '사용자 관리') {
    console.log('pathname : ', pathname.split('/'))
  }
  return (
    <Menu as="div" className="relative inline-block mx-12 text-left">
      {children.length > 0 ? (
        <Menu.Button className="inline-flex justify-center w-full px-3 py-2">
          <h1
            className={`${
              `/${pathname.split('/')[2]}` === route
                ? 'text-[#623AD6]'
                : 'black'
            }`}
          >
            {name}
          </h1>
        </Menu.Button>
      ) : (
        <Link to={`/dashboard${route}`}>
          <Menu.Button className="inline-flex justify-center w-full px-3 py-2">
            <h1
              className={`${
                `/dashboard${route}` === pathname && 'text-[#623AD6]'
              }`}
            >
              {name}
            </h1>
          </Menu.Button>
        </Link>
      )}
      {children.length > 0 && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg -right-20 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {children.map((item) => (
                <Menu.Item key={item.route}>
                  {({ active }) => (
                    <Link to={`/dashboard${item.route}`}>
                      <p
                        className={`${
                          active && 'bg-gray-100'
                        } block px-4 py-2 text-sm ${
                          `/dashboard${item.route}` === pathname &&
                          'text-[#623AD6]'
                        }`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  )
}

export default MenuDropDown
