// ** Next Imports
import Image from "next/image";

// ** Component Imports
import TicketUserButton from "../TicketUserButton";
import TicketStatusButton from "../TicketStatusButton";
import TicketDatePicker from "../TicketDatePicker";

// ** Utils Imports
import dayjs from "dayjs";

// ** Type Imports
import { Ticket } from "@/src/type/ticket";
import TicketSettingButton from "../TicketSettingButton";
import TicketEpicButton from "../TicketEpicButton";

interface PropsType {
  data: Ticket;
  isEpic: boolean;
  word: string;
  handleClick: (id: number) => void;
}

const TicketItem = ({ handleClick, data, isEpic, word }: PropsType) => {
  const highlightFirstMatch = (text: string, word: string) => {
    const index = text.toLowerCase().indexOf(word.toLowerCase());
    if (index === -1) return text;
    const before = text.slice(0, index);
    const match = text.slice(index, index + word.length);
    const after = text.slice(index + word.length);
    return (
      <>
        {before}
        <mark>{match}</mark>
        {after}
      </>
    );
  };

  return (
    <tr
      className="border-b transition-colors data-[state=selected]:bg-muted cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={() => handleClick(data.ticketId)}
    >
      <td
        className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
        style={{ width: "5%" }}
      >
        <div className="flex items-center justify-center">
          <TicketSettingButton data={data} isText={false} />
        </div>
      </td>
      <td
        className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium pl-6"
        style={{ width: "60%" }}
      >
        {data.name}
      </td>
      <td
        className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
        style={{ width: "5%" }}
      >
        <div className="flex items-center justify-center">
          <TicketUserButton
            profile={data.worker ? data.worker.profile : "/images/dice.png"}
            nickname={data.worker ? data.worker.nickname : "-"}
            email={data.worker ? data.worker.email : "-"}
            userId={data.worker?.userId}
            type="user"
            ticketId={data.ticketId}
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
        style={{ width: "15%" }}
      >
        <TicketStatusButton ticketId={data.ticketId} status={data.status} />
      </td>
    </tr>
  );
};

export default TicketItem;
