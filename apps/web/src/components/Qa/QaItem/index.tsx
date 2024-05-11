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
  word: string;
  handleOpenQa: (id: number) => void;
}

const QaItem = ({ item, handleOpenQa, word, qaId }: PropsType) => {
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
    <div className="w-full" onClick={() => handleOpenQa(item.id)}>
      <div className="flex items-center w-full">
        <h1 className="text-[16px]">{item.code}</h1>
        {dayjs().diff(dayjs(item.createdDate), "hour") <= 24 && (
          <div className="bg-[#F13333] ml-[20px] w-[67px] h-[30px] rounded-[10px] text-white flex items-center justify-center">
            NEW
          </div>
        )}
      </div>
      <h1 className="mt-[5px] text-[18px] font-san-medium">
        {highlightFirstMatch(item.title, word)}
      </h1>
      <div className="w-full h-[45px] flex justify-between items-end mt-[15px]">
        <div className="flex items-center">
          <QaUserButton
            profile={item.worker.profile}
            nickname={item.worker.nickname}
            email={item.worker.email}
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
