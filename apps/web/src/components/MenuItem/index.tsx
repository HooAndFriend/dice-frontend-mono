// ** Next Imports
import Link from 'next/link'
import CustomImage from '../Image/CustomImage'
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'
import Image from 'next/image'
import { ReactNode } from 'react'

interface PropsType {
  children: JSX.Element
  isOpen: boolean
  label: string
  // link: string
}

const MenuItem = ({ label, isOpen, children }: PropsType) => {
  const workspace = useRecoilValue(WorkspaceState)
  return (
    <div className="w-full px-[32px]">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[12px] text-[#6A6F75]">{label}</h1>
        <CustomImage
          src={isOpen ? '/images/bottom.png' : '/images/top.png'}
          alt="top"
          width={20}
          height={20}
        />
      </div>

      {children}
    </div>
  )
}

export default MenuItem
