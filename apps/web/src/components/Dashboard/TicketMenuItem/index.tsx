// ** Next Imports
import Link from 'next/link'

interface PropsType {
  isClicked: boolean
  name: string
  link: string
}

const TicketMenuItem = ({ link, isClicked, name }: PropsType) => {
  return (
    <Link href={link} className="flex items-center justify-center mt-4">
      <div
        className={`flex items-center justify-center rounded-[10px] w-[90%] h-[40px] py-3 ${
          isClicked ? 'bg-[#623AD6]' : ''
        }`}
      >
        <div className="w-full pl-[12px]">
          <h1 className={`text-${isClicked ? 'white' : 'black'}`}>{name}</h1>
        </div>
      </div>
    </Link>
  )
}

export default TicketMenuItem
