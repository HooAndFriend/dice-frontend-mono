// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Type Imports
import { GetQaHistoryListResponse } from "@/src/type/qa";

// ** Component Imports
import QaHistoryItem from "../QaHistoryItem";
import QaHistorySkeleton from "./QaHistorySkeleton";

interface PropsType {
  qaId: number;
}

const QaHistory = ({ qaId }: PropsType) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/log/v1/qa-history-log/${qaId}`,
    async (url) => Get<GetQaHistoryListResponse>(url)
  );

  return (
    <div className="mt-2">
      {isLoading ? (
        <QaHistorySkeleton />
      ) : (
        data.data.data.map((item) => (
          <QaHistoryItem key={item.id} data={item} />
        ))
      )}
    </div>
  );
};

export default QaHistory;
