// ** React Imports
import { useRef } from "react";

// ** Component Imports
import TicketUserButton from "../TicketUserButton";
import TicketStatusButton from "../TicketStatusButton";
import TicketSettingButton from "../TicketSettingButton";
import type { Identifier, XYCoord } from "dnd-core";

// ** Utils Imports
import dayjs from "dayjs";
import { useDrag, useDrop } from "react-dnd";

// ** Type Imports
import { Ticket } from "@/src/type/ticket";

interface PropsType {
  data: Ticket;
  isEpic: boolean;
  word: string;
  handleClick: (id: number) => void;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

const TicketItem = ({
  handleClick,
  data,
  isEpic,
  word,
  moveCard,
}: PropsType) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ handlerId }, drop] = useDrop<
    Ticket,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item: Ticket, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.ticketId;
      const hoverIndex = data.ticketId;

      console.log("DRAG INDEX : ", dragIndex);
      console.log("HOVER INDEX : ", hoverIndex);

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.orderId = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { ...data };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

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
      className="border-b transition-colors data-[state=selected]:bg-muted hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer w-full"
      onClick={() => handleClick(data.ticketId)}
      data-handler-id={handlerId}
      style={{
        opacity,
      }}
      ref={ref}
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
        style={{ width: "55%" }}
      >
        {data.name}
      </td>
      <td
        className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
        style={{ width: "10%" }}
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
        style={{ width: "15%", whiteSpace: "nowrap" }}
      >
        {data.dueDate ? dayjs(data.dueDate).format("YYYY-MM-DD") : "-"}
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
