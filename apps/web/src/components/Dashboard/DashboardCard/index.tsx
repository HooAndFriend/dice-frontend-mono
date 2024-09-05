// ** Next Imports
import CustomImage from '@/src/components/Image/CustomImage'
import Image from 'next/image'

interface PropsType {
  icon: string
  title: string
  text: string
}

const DashboardCard = ({ icon, title, text }: PropsType) => {
  return (
    <div className={` h-full  bg-white rounded-[20px] shadow-md p-[24px]`}>
      <div className={`w-full h-[60px] rounded-full flex items-center`}>
        <Image src={icon} alt="title" width={30} height={30} />
        <p className="text-[#676767] pl-[8px]">{title}</p>
      </div>

      <div className="mt-6">
        <h1 className="text-[32px] font-bold">{text}</h1>
      </div>
      <div className="flex items-center justify-between mt-6"></div>
    </div>
  )
}

export default DashboardCard
