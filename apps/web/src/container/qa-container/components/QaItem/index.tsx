// ** Type Imports
import { IssueInfo } from "@/src/type/qa";

// ** Utils Imports
import dayjs from "dayjs";

// ** Component Imports
import QaStatusButton from "../QaStatusButton";
import QaUserButton from "../QaUserButton";

interface PropsType {
  item: IssueInfo;
  qaId: number;
  handleOpenQa: (id: number) => void;
}

const QaItem = ({ item, handleOpenQa, qaId }: PropsType) => {
  return (
    <div
      className={`px-4 w-full ${
        qaId === item.id ? "bg-blue-50" : ""
      } hover:bg-blue-50 h-[100px] py-2 border-b border-solid border-[#EBEBEC]`}
      onClick={() => handleOpenQa(item.id)}
    >
      <div className="flex w-full h-[30px] font-spoqa font-medium text-lg">
        <h1 className="font-bold">[{item.code}]</h1>
        <h1 className="ml-2 mr-4">{item.title}</h1>
        {dayjs().diff(dayjs(item.createdDate), "hour") <= 24 && (
          <div className="bg-[#F13333] w-[67px] h-[30px] rounded-[10px] text-white flex items-center justify-center font-spoqa text-base text-center">
            NEW
          </div>
        )}
      </div>
      <div className="w-full h-[45px] flex justify-between items-end mb-2">
        <div className="flex items-center">
          <QaUserButton
            profile={item.worker.profile}
            nickname={item.worker.nickname}
            type="user"
            qaId={item.id}
          />
          <h1 className="ml-8">{item.dueDate}</h1>
        </div>
        <QaStatusButton status={item.status} qaId={item.id} />
      </div>
    </div>
  );
};

export default QaItem;
