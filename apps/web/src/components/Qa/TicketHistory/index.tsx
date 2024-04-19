// ** Services Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Components Imports
import TicketHistoryItem from "../QaHistoryItem";

// ** Type Imports
import { GetQaHistoryListResponse } from "@/src/type/qa";

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
    Get<GetQaHistoryListResponse>(url)
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
