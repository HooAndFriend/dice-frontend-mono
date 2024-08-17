'use client'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/src/components/ui/table'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/src/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/src/components/ui/avatar'
import { Badge } from '@/src/components/ui/badge'

interface PropsType {}

const DashboardTask = ({}: PropsType) => {
  return (
    <Card className="bg-white rounded-[20px] shadow-md lg:col-span-2 flex-1">
      <CardHeader>
        <CardTitle>Tickets Needing Attention</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">#123</div>
                <div className="text-sm text-muted-foreground">
                  Improve onboarding
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-red-600 bg-red-100">
                  Reopened
                </Badge>
              </TableCell>
              <TableCell>2023-05-01</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">Alex</div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">#456</div>
                <div className="text-sm text-muted-foreground">
                  Fix mobile layout
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="text-yellow-600 bg-yellow-100"
                >
                  Past Due
                </Badge>
              </TableCell>
              <TableCell>2023-04-15</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">Sarah</div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">#789</div>
                <div className="text-sm text-muted-foreground">
                  Implement new analytics
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="text-yellow-600 bg-yellow-100"
                >
                  Past Due
                </Badge>
              </TableCell>
              <TableCell>2023-04-30</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">Max</div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default DashboardTask
