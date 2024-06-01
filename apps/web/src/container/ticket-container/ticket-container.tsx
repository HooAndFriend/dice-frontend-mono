// ** Next Imports
import Image from "next/image";

// ** Component Imports
import TicketCard from "@/src/components/Task/Ticket/TicketCard";
import TicketTable from "@/src/components/Task/Ticket/TicketTable";
import TicketSearchCard from "../../components/Task/Ticket/TicketSearchCard";

// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";
import { WorkspaceUser } from "@/src/type/workspace";
import { EpicStatus } from "@/src/type/epic";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";
import TicketViewToggleButton from "@/src/components/Task/Ticket/TicketViewToggleButton";
import TicketKanbanBoard from "@/src/components/Task/Ticket/TicketKanbanBoard";
import TicketTableSkeleton from "@/src/components/Task/Ticket/TicketTable/TicketTableSkeleton";
import Component from "@/src/components/Table";
import CustomSearch from "@/src/components/Input/CustomSearch";
import TicketStatusSelectFilter from "@/src/components/task/Common/Filter/StatusFilter";
import TicketTypeSelectFilter from "@/src/components/task/Common/Filter/TypeFilter";
import EpicSelectFilter from "@/src/components/task/Common/Filter/EpicFilter";
import UserSelectBox from "@/src/components/UserSelectBox";

interface PropsType {
  ticketId: number;
  data: TicketInfo[];
  word: string;
  ticketCount: number;
  isLoading: boolean;
  mode: "list" | "kanban";
  checkedList: WorkspaceUser[];
  selectedEpicIds: number[];
  selectedStatus: EpicStatus[];
  selectedTypeIds: number[];
  handleTypeSelectFilter: (typeId: number) => void;
  handleStatusSelectFilter: (status: EpicStatus) => void;
  handleEpicSelectFilter: (epicId: number) => void;
  setCheckedList: (list: WorkspaceUser[]) => void;
  setMode: (mode: "list" | "kanban") => void;
  setTicketId: (id: number) => void;
  handleWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const TicketContainerView = ({
  ticketId,
  data,
  word,
  mode,
  selectedStatus,
  selectedEpicIds,
  selectedTypeIds,
  isLoading,
  ticketCount,
  setTicketId,
  handleWord,
  onDragEnd,
  setMode,
  checkedList,
  setCheckedList,
  handleTypeSelectFilter,
  handleStatusSelectFilter,
  handleEpicSelectFilter,
}: PropsType) => {
  return (
    <div className="w-full">
      {/* <TicketSearchCard
        value={word}
        selectedStatus={selectedStatus}
        selectedEpicIds={selectedEpicIds}
        selectedTypeIds={selectedTypeIds}
        handleTypeSelectFilter={handleTypeSelectFilter}
        handleStatusSelectFilter={handleStatusSelectFilter}
        handleEpicSelectFilter={handleEpicSelectFilter}
        onChange={handleWord}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
      /> */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex ">
          <CustomSearch width="200px" />
          <EpicSelectFilter
            selectdIds={selectedEpicIds}
            handleEpicSelectFilter={handleEpicSelectFilter}
          />
          <TicketStatusSelectFilter
            selectedStatus={selectedStatus}
            handleEpicSelectFilter={handleStatusSelectFilter}
          />
          <TicketTypeSelectFilter
            selectedTypeIds={selectedTypeIds}
            handleTypeSelectFilter={handleTypeSelectFilter}
          />
          <UserSelectBox
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
        {/* <h1 className="text-[18px] font-san-medium">
          Total Ticket : {ticketCount}
        </h1> */}
        <TicketViewToggleButton mode={mode} setMode={setMode} />
      </div>
      <div className={`${ticketId !== 0 && "flex"}`}>
        <div style={{ width: ticketId !== 0 ? "65%" : "100%" }}>
          {mode === "list" ? (
            isLoading ? (
              <TicketTableSkeleton />
            ) : (
              <Component data={data} />
              // <TicketTable
              //   handleClick={setTicketId}
              //   word={word}
              //   data={data
              //     .filter((item) => item.name.includes(word))
              //     .filter((item) =>
              //       checkedList.length === 0
              //         ? true
              //         : checkedList.some(
              //             (_) => _.teamUser.user.id === item.worker?.id
              //           )
              //     )
              //     .filter((item) =>
              //       selectedEpicIds.length === 0
              //         ? true
              //         : selectedEpicIds.includes(item.epic?.id)
              //     )
              //     .filter((item) =>
              //       selectedStatus.length === 0
              //         ? true
              //         : selectedStatus.includes(item.status)
              //     )
              //     .filter((item) =>
              //       selectedTypeIds.length === 0
              //         ? true
              //         : selectedTypeIds.includes(item.ticketSetting?.id)
              //     )}
              //   onDragEnd={onDragEnd}
              // />
            )
          ) : (
            <TicketKanbanBoard
              handleClick={setTicketId}
              data={data.filter((item) => item.name.includes(word))}
              isLoading={isLoading}
            />
          )}
        </div>
        {ticketId !== 0 && (
          <div className="w-[35%] pl-8">
            <TicketCard
              ticketId={ticketId}
              handleClose={() => setTicketId(0)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketContainerView;
