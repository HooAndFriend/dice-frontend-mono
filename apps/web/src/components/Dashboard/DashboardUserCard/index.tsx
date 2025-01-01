// ** Next Imports
import Image from 'next/image'
import Link from 'next/link'

// ** Component Imports
import Tooltip from '../../Tooltip'

// ** Type Imports
import { TicketStats } from '@/src/type/ticket'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

interface PropsType {
  icon: string
  data: TicketStats
}

const DashboardUserCard = ({ data, icon }: PropsType) => {
  const { uuid } = useRecoilValue(WorkspaceState)

  return (
    <div
      className={` h-full  bg-white rounded-[20px] shadow-md p-[24px] lg:col-span-2`}
    >
      <div className={`w-full h-[60px] rounded-full flex items-center `}>
        <Image src={icon} alt="title" width={30} height={30} />
        <p className="text-[#676767] pl-[8px]">User Tasks</p>
      </div>

      <div className="flex justify-center mt-6">
        {data.userList
          .sort((a, b) => b.ticketCount - a.ticketCount)
          .slice(0, 8)
          .map((item) => (
            <Link
              href={`/${uuid}/dashboard/task/issue?userId=${item.userId}`}
              key={item.userId}
            >
              <div className="mx-[12px]">
                <div className="flex justify-center">
                  <Tooltip text={item.nickname}>
                    <Image
                      className="rounded-[15px] border border-[#EBEBEC] "
                      src={item.profile}
                      alt="profile"
                      width={50}
                      height={50}
                    />
                  </Tooltip>
                </div>
                <div className="flex items-center justify-center mt-[8px]">
                  <p className="text-[12px]">
                    {item.ticketDoneCount} / {item.ticketCount}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default DashboardUserCard
