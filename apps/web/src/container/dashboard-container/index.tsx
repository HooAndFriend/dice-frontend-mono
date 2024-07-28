import Link from "next/link";
import { Separator } from "@/src/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import DashboardCard from "@/src/components/Dashboard/DashboardCard";
import DashboardBoard from "@/src/components/Dashboard/DashboardBoard";

const DashboardContainer = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FAFAFB]">
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <DashboardCard
              width="380px"
              height="215px"
              // color="#ECF6FF"
              color="#F4F4FA"
              icon="/svg/dashboard-task.svg"
              title="Today Tasks"
              text={"3건(66%)"}
              value={100}
            />
            <DashboardCard
              width="380px"
              height="215px"
              color="#F4F4FA"
              icon="/svg/dashboard-user.svg"
              title="Review Tasks"
              text={"0건"}
              value={100}
            />
            <DashboardCard
              width="380px"
              height="215px"
              // color="#FFEBF1"
              color="#F4F4FA"
              icon="/svg/dashboard-progress.svg"
              title="Sprint Progress"
              text={"0건"}
              value={100}
            />
            <DashboardCard
              width="380px"
              height="215px"
              // color="#FAEBFF"
              color="#F4F4FA"
              icon="/svg/dashboard-task-2.svg"
              title="Completed Tasks"
              text={"0건"}
              value={100}
            />

            <DashboardCard
              width="380px"
              height="215px"
              // color="#FFEBF1"
              color="#F4F4FA"
              icon="/svg/dashboard-progress.svg"
              title="Progress"
              text={"0건"}
              value={100}
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="col-span-2 bg-white shadow">
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
                        <Badge
                          variant="outline"
                          className="text-red-600 bg-red-100"
                        >
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
            <DashboardBoard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardContainer;

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
