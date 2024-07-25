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

const DashboardContainer = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FAFAFB]">
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <Card className="bg-white shadow">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Attention Needed</CardTitle>
                <TicketIcon className="w-6 h-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">
                  Tickets past due or reopened
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Resolution Rate</CardTitle>
                <CheckIcon className="w-6 h-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">92%</div>
                <div className="text-sm text-muted-foreground">
                  Tickets resolved by story points
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Resolution Rate</CardTitle>
                <CheckIcon className="w-6 h-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">92%</div>
                <div className="text-sm text-muted-foreground">
                  Tickets resolved by story points
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Sprint Progress</CardTitle>
                <GaugeIcon className="w-6 h-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="flex-1" />
                  <div className="text-2xl font-bold">75%</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>New Articles</CardTitle>
                <FileIcon className="w-6 h-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">
                  Articles published this week
                </div>
              </CardContent>
            </Card>
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
            <Card className="bg-white shadow">
              <CardHeader>
                <CardTitle>Recent Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary text-primary-foreground">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div className="grid gap-1">
                      <div className="font-medium">
                        Optimizing Your Jira Workflow
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Learn how to streamline your Jira processes for maximum
                        efficiency.
                      </div>
                      <div className="text-xs text-muted-foreground">
                        3 days ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div className="grid gap-1">
                      <div className="font-medium">
                        Mastering Agile Retrospectives
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Discover proven techniques to make your Agile
                        retrospectives more effective.
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1 week ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-accent text-accent-foreground">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div className="grid gap-1">
                      <div className="font-medium">
                        Integrating Jira with Your Toolchain
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Explore strategies for seamlessly connecting Jira with
                        your other development tools.
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2 weeks ago
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardContainer;

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

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

function GaugeIcon(props) {
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
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function LogOutIcon(props) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TicketIcon(props) {
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
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
