import { WorkspaceState } from "@/src/app";
import { BoardInfo } from "@/src/type/board";
import dayjs from "dayjs";
import Link from "next/link";

import { useRecoilValue } from "recoil";

interface PropsType {
  data: BoardInfo;
}

const DashboardBoardItem = ({ data }: PropsType) => {
  const { uuid } = useRecoilValue(WorkspaceState);

  return (
    <Link href={`/${uuid}/dashboard/board/${data.boardId}`}>
      <div className="flex items-start gap-4 cursor-pointer">
        <div className="p-2 rounded-full bg-accent text-accent-foreground">
          <FileIcon className="w-5 h-5" />
        </div>
        <div className="grid gap-1">
          <div className="font-medium">{data.title}</div>
          <div className="text-sm text-muted-foreground">
            Explore strategies for seamlessly connecting Jira with your other
            development tools.
          </div>
          <div className="text-xs text-muted-foreground">
            {dayjs(data.createdDate).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardBoardItem;

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
