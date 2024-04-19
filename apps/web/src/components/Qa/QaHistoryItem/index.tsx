// ** Type Imports
import { QaHistory } from "@/src/type/qa";

interface PropsType {
  data: QaHistory;
}

const QaHistoryItem = ({ data }: PropsType) => {
  return (
    <div className="flex items-center w-full mb-5">
      <div className="w-[5px] h-[5px] rounded-full bg-black" />
      {data.username} : {data.log}
    </div>
  );
};

export default QaHistoryItem;
