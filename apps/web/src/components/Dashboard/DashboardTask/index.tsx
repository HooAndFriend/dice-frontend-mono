'use client'
// ** Next Imports
import Image from 'next/image'
import Link from 'next/link'

// ** Component Imports
import { Table, TableBody } from '@/src/components/ui/table'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/src/components/ui/card'
import TicketViewItem from '../../Task/Ticket/TicketViewItem'

// ** Type Imports
import { TicketInfo } from '@/src/type/ticket'

interface PropsType {
  title: string
  userId: number
  workspaceUid: string
  data: TicketInfo[]
  isAdmin: boolean
  handleClick: (ticketId: number) => void
}

const DashboardTask = ({
  title,
  data,
  isAdmin,
  handleClick,
  workspaceUid,
  userId,
}: PropsType) => {
  return (
    <Card className="bg-white max-h-[380px] rounded-[20px] shadow-md lg:col-span-2 flex-1 overflow-auto">
      <CardHeader>
        <Link href={`/${workspaceUid}/dashboard/task/issue?userId=${userId}`}>
          <CardTitle>{`${title} (${data.length})`}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th
                className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                style={{ width: '5%' }}
              >
                Type
              </th>
              <th
                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                style={{ width: isAdmin ? '45%' : '55%' }}
              >
                Title
              </th>
              <th
                className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                style={{ width: '10%' }}
              >
                Assignee
              </th>
              {isAdmin && (
                <th
                  className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                  style={{ width: '10%' }}
                >
                  Reporter
                </th>
              )}
              <th
                className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                style={{ width: '15%' }}
              >
                Due Date
              </th>
              <th
                className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                style={{ width: '15%' }}
              >
                Status
              </th>
            </tr>
          </thead>
          <TableBody>
            {data.map((ticket) => (
              <TicketViewItem
                key={ticket.ticketId}
                data={ticket}
                isEpic={false}
                isAdmin={isAdmin}
                handleClick={handleClick}
              />
            ))}
          </TableBody>
        </Table>
        {data.length === 0 && (
          <div className="flex items-center justify-center h-full mt-[40px] text-muted-foreground">
            <Image
              src="/images/no_task.jpeg"
              width={200}
              height={150}
              alt="No Data UI"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DashboardTask
