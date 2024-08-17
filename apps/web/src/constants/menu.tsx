import TicketIcon from '@/public/svg/ticket.svg'
import QaIcon from '@/public/svg/qa.svg'

export interface MenuType {
  id: number
  name: string
  link: string
  icon: React.FC<{ className: string }>
  isClicked: boolean
}

export const MenuList = [
  {
    id: 1,
    name: 'TICKET',
    link: '/task',
    icon: TicketIcon,
    isClicked: false,
  },
  // {
  //   id: 2,
  //   name: "QA",
  //   link: "/qa",
  //   icon: QaIcon,
  //   isClicked: false,
  // },
  {
    id: 3,
    name: 'BOARD',
    link: '/board',
    icon: QaIcon,
    isClicked: false,
  },
]
