import { Get } from "@/src/repository";
import { GetTicketHistoryListResponse } from "@/src/type/ticket";
import useSWR from "swr";
import TicketHistoryItem from "../TicketHistoryItem";

interface PropsType {
  ticketId: number;
}

const TicketHistory = ({ ticketId }: PropsType) => {
  const {
    data,
    error,
    isLoading,
    mutate: commentRefetch,
  } = useSWR(`/log/v1/ticket-history-log/${ticketId}`, async (url) =>
    Get<GetTicketHistoryListResponse>(url)
  );

  if (isLoading) return;

  return (
    <div className="mt-2">
      {data.data.data.map((item) => (
        <TicketHistoryItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default TicketHistory;
