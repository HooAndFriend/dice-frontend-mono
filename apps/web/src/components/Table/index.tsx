/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5okCpQycAzD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import TicketSettingButton from "../Task/Ticket/TicketSettingButton";
import { TicketInfo } from "@/src/type/ticket";
import TicketUserButton from "../Task/Ticket/TicketUserButton";
import TicketStatusButton from "../Task/Ticket/TicketStatusButton";
import TicketEpicButton from "../Task/Ticket/TicketEpicButton";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PropsType {
  data: TicketInfo[];
}

export default function Component({ data }: PropsType) {
  const [expandedRows, setExpandedRows] = useState([]);
  const toggleRow = (rowIndex) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(rowIndex)
        ? prevExpandedRows.filter((index) => index !== rowIndex)
        : [...prevExpandedRows, rowIndex]
    );
  };
  return (
    <div className="w-full bg-white border rounded-lg mt-[8px] scrollbar-thumb-slate-700 scrollbar-track-slate-300">
      <div className="relative w-full overflow-y-scroll scrollbar-thin  h-[564px]">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm caption-bottom">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th
                  className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                  style={{ width: "5%" }}
                >
                  Type
                </th>
                <th
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                  style={{ width: "50%" }}
                >
                  Title
                </th>
                <th
                  className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                  style={{ width: "15%" }}
                >
                  EPIC
                </th>
                <th
                  className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                  style={{ width: "15%" }}
                >
                  Assignee
                </th>
                <th
                  className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                  style={{ width: "15%" }}
                >
                  Due Date
                </th>
                <th
                  className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
                  style={{ width: "10%" }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {data.map((item) => (
                <tr className="border-b transition-colors data-[state=selected]:bg-muted cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td
                    className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
                    style={{ width: "5%" }}
                  >
                    <div className="flex items-center justify-center">
                      <TicketSettingButton data={item} isText={false} />
                    </div>
                  </td>
                  <td
                    className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium pl-6"
                    style={{ width: "50%" }}
                  >
                    {item.name}
                  </td>
                  <td
                    className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 font-medium pl-6"
                    style={{ width: "15%" }}
                  >
                    <div className="flex items-center justify-center">
                      <TicketEpicButton data={item} />
                    </div>
                  </td>
                  <td
                    className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
                    style={{ width: "5%" }}
                  >
                    <div className="flex items-center justify-center">
                      <TicketUserButton
                        profile={
                          item.worker ? item.worker.profile : "/images/dice.png"
                        }
                        nickname={item.worker ? item.worker.nickname : "-"}
                        email={item.worker ? item.worker.email : "-"}
                        userId={item.worker?.id}
                        type="user"
                        ticketId={item.id}
                        isNickname={false}
                      />
                    </div>
                  </td>

                  <td
                    className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
                    style={{ width: "15%" }}
                  >
                    2023-06-15
                  </td>
                  <td
                    className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
                    style={{ width: "10%" }}
                  >
                    <TicketStatusButton
                      ticketId={item.id}
                      status={item.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
