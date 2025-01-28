import { useEffect, useState } from 'react'
import Link from 'next/link'

interface PropsType {
  isOpen: boolean
  label: string
  icon: React.FC<{ className: string }>
  selectIcon: React.FC<{ className: string }>
  link: string
}

const TicketMenuItem = ({
  link,
  icon: Icon,
  selectIcon: SelectIcon,
  isOpen,
  label,
}: PropsType) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Link href={link} className="flex items-center justify-center">
      <div
        className={`flex items-center justify-center w-full h-[48px] ${
          isOpen ? 'bg-[#F8F5FF]' : ''
        }`}
      >
        <div className="w-full px-[32px] flex items-center">
          {isOpen ? (
            <SelectIcon className="mr-[16px]" />
          ) : (
            <Icon className="mr-[16px]" />
          )}
          <h1 className={`text-[12px] text-${isOpen ? '[#623AD6]' : 'black'}`}>
            {label}
          </h1>
        </div>
      </div>
    </Link>
  )
}

export default TicketMenuItem
