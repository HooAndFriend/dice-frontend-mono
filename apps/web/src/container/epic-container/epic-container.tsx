// ** Component Imports
import EpicTable from "@/src/components/Task/Epic/EpicTable";
import WordFilter from "../../components/Task/Common/Filter/WordFilter";
import EpicCard from "@/src/components/Task/Epic/EpicCard";
import TicketCard from "@/src/components/Task/Ticket/TicketCard";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

// ** Type Imports
import { EpicInfo, SelectContent } from "@/src/type/epic";
import EpicTableSkeleton from "@/src/components/Task/Epic/EpicTable/EpicTableSkeleton";

interface PropsType {
  word: string;
  epicData: EpicInfo[];
  epicCount: number;
  isLoading: boolean;
  selectContent: SelectContent;
  setSelectContent: (value: SelectContent) => void;
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const EpicContainerView = ({
  epicData,
  isLoading,
  epicCount,
  word,
  selectContent,
  setSelectContent,
  handleWord,
  onDragEnd,
}: PropsType) => {
  return (
    <div className="w-full">
      <WordFilter value={word} onChange={handleWord} />
      <div className="mt-[56px] mb-[44px]">
        <h1 className="text-[18px] font-san-medium">
          Total Epic : {epicCount}
        </h1>
      </div>
      <div className={`${selectContent.id !== 0 && "flex"}`}>
        <div style={{ width: selectContent.id !== 0 ? "65%" : "100%" }}>
          {isLoading ? (
            <EpicTableSkeleton />
          ) : (
            <EpicTable
              word={word}
              handleClick={setSelectContent}
              epicData={epicData.filter((item) => item.name.includes(word))}
              onDragEnd={onDragEnd}
            />
          )}
        </div>
        {selectContent.id !== 0 && selectContent.type === "EPIC" && (
          <div className="w-[35%] ml-[30px]">
            <EpicCard
              epicId={selectContent.id}
              handleClose={() => setSelectContent({ id: 0, type: "EPIC" })}
            />
          </div>
        )}
        {selectContent.id !== 0 && selectContent.type === "TICKET" && (
          <div className="w-[35%] ml-8 -mt-[44px]">
            <TicketCard
              ticketId={selectContent.id}
              handleClose={() => setSelectContent({ id: 0, type: "TICKET" })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EpicContainerView;
