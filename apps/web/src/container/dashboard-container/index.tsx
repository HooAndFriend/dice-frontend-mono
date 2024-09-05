import DashboardCard from '@/src/components/Dashboard/DashboardCard'
import DashboardBoard from '@/src/components/Dashboard/DashboardBoard'
import DashboardTask from '@/src/components/Dashboard/DashboardTask'

// ** Type Imports
import { TicketInfo, TicketStats } from '@/src/type/ticket'
import DashboardUserCard from '@/src/components/Dashboard/DashboardUserCard'

interface PropsType {
  email: string
  ticketStats: TicketStats
  ticketData: TicketInfo[]
}

const DashboardContainer = ({ email, ticketStats, ticketData }: PropsType) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FAFAFB] px-4 py-6">
      <div className="flex flex-col gap-6">
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
          style={{ flex: '1' }}
        >
          <DashboardCard
            icon="/svg/dashboard-task.svg"
            title="Today Tasks"
            text={`${ticketStats.user.myTodayDoneCount} / ${ticketStats.user.myTodayCount}`}
          />
          <DashboardCard
            icon="/svg/dashboard-task-2.svg"
            title="My Tasks"
            text={`${ticketStats.user.myDoneCount} / ${ticketStats.user.myCount}`}
          />
          <DashboardCard
            icon="/svg/dashboard-progress.svg"
            title="Total Tasks"
            text={`${ticketStats.totalDoneCount} / ${ticketStats.totalCount}`}
          />
          <DashboardUserCard
            icon="/svg/dashboard-user.svg"
            data={ticketStats}
          />
        </div>
        <div className="grid flex-1 gap-6 lg:grid-cols-3" style={{ flex: '2' }}>
          <div className="flex flex-col lg:col-span-2">
            <DashboardTask
              data={ticketData.filter(
                (ticket) => ticket.worker && ticket.worker.email === email,
              )}
              isAdmin={false}
            />
          </div>
          <div className="flex flex-col lg:col-span-1">
            <DashboardBoard />
          </div>
        </div>
        <div className="grid flex-1 gap-6 lg:grid-cols-3" style={{ flex: '2' }}>
          <div className="flex flex-col lg:col-span-1">
            <DashboardBoard />
          </div>
          <div className="flex flex-col lg:col-span-2">
            <DashboardTask
              data={ticketData.filter(
                (ticket) => ticket.admin && ticket.admin.email === email,
              )}
              isAdmin
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContainer
