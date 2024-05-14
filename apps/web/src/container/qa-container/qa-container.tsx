// ** Next Imports
import Image from "next/image";

// ** Component Imports
import QaCard from "../../components/Qa/QaCard";
import CustomSearch from "@/src/components/Input/CustomSearch";
import StatusItem from "../../components/Qa/StatusItem";
import QaItem from "../../components/Qa/QaItem";
import QaSaveModal from "@/src/components/Modal/QaSaveModal";
import CustomImage from "@/src/components/Image/CustomImage";
import UserSelectBox from "@/src/components/UserSelectBox";

// ** Type Imports
import { IssueInfo } from "@/src/type/qa";
import { EpicStatus } from "@/src/type/epic";
import { RoleType } from "@/src/type/common";

// ** Utils Imports
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { WorkspaceUser } from "@/src/type/workspace";
import QaSkeleton from "./QaSkeleton";

interface PropsType {
  open: boolean;
  saveOpen: boolean;
  qaId: number;
  role: RoleType;
  data: IssueInfo[];
  status: EpicStatus;
  word: string;
  cancelButtonRef: any;
  checkedList: WorkspaceUser[];
  isLoading: boolean;
  setCheckedList: (list: WorkspaceUser[]) => void;
  setWord: (value: string) => void;
  handleOpenQa: (id: number) => void;
  setStatus: (status: EpicStatus) => void;
  setOpen: (value: boolean) => void;
  setSaveOpen: (value: boolean) => void;
  refetch: () => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const QaContainerView = ({
  data,
  qaId,
  role,
  status,
  open,
  isLoading,
  word,
  checkedList,
  setCheckedList,
  setWord,
  setStatus,
  handleOpenQa,
  saveOpen,
  setSaveOpen,
  setOpen,
  cancelButtonRef,
  refetch,
  onDragEnd,
}: PropsType) => {
  return (
    <div className="w-full bg-[#FAFAFB] p-5">
      <div className="w-full h-[100px] shadow-md border-[#EBEBEC] rounded-[20px] bg-white mt-[30px] flex items-center">
        <div className="font-spoqa text-base font-bold ml-[50px] mr-[29px] text-center">
          Search
        </div>
        <CustomSearch
          value={word}
          onChange={(e) => setWord(e.target.value)}
          name="value"
        />
        <div className="ml-8">
          <UserSelectBox
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className={`${open ? "w-1/2" : "w-full"} pr-5`}>
          <div className="h-[50px] w-full flex justify-between items-center mt-[43px] mb-[30px]">
            <div className="text-lg font-medium text-center font-spoqa">
              Total {data.length}건
            </div>
            <div className="flex items-center">
              <div className="flex items-center h-6 w-[406px] justify-between font-spoqa text-[#EBEBEC]">
                <StatusItem
                  status={status}
                  setStatus={setStatus}
                  value=""
                  label="ALL"
                />
                <div className="h-[15px] w-px bg-[#EBEBEC]" />
                <StatusItem
                  status={status}
                  setStatus={setStatus}
                  value="WAITING"
                />
                <div className="h-[15px] w-px bg-[#EBEBEC]" />
                <StatusItem
                  status={status}
                  setStatus={setStatus}
                  value="DOING"
                />
                <div className="h-[15px] w-px bg-[#EBEBEC]" />
                <StatusItem
                  status={status}
                  setStatus={setStatus}
                  value="DONE"
                />
                <div className="h-[15px] w-px bg-[#EBEBEC]" />
                <StatusItem
                  status={status}
                  setStatus={setStatus}
                  value="COMPLETE"
                />
              </div>
              {role !== "VIEWER" && (
                <div
                  onClick={() => setSaveOpen(true)}
                  className="w-[120px] h-[50px] rounded-[30px] flex items-center bg-white border border-[#EBEBEC] justify-center ml-8 cursor-pointer"
                >
                  <CustomImage
                    src="/images/Add_To_Queue.png"
                    width={24}
                    height={24}
                    alt="add"
                  />
                  <div className="font-spoqa font-bold text-center ml-[5px]">
                    Add
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full p-[24px] h-[564px] rounded-[20px] bg-white mr-10 shadow-md border-[#EBEBEC] overflow-y-auto overflow-x-hidden">
            {isLoading ? (
              <QaSkeleton />
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {data.map((item) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={item.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <QaItem
                                word={word}
                                item={item}
                                key={item.id}
                                handleOpenQa={handleOpenQa}
                                qaId={qaId}
                              />
                              <div className="w-full h-[1px] my-[24px] bg-[#EBEBEC]" />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>
        {open && (
          <div className="w-1/2 mt-[123px] h-[564px] rounded-[20px] bg-white shadow-md border-[#EBEBEC] py-[20px] px-[24px] overflow-y-auto">
            <QaCard
              qaId={qaId}
              handleClose={() => setOpen(false)}
              refetch={refetch}
            />
          </div>
        )}
        {saveOpen && (
          <QaSaveModal
            open={saveOpen}
            setOpen={setSaveOpen}
            cancelButtonRef={cancelButtonRef}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default QaContainerView;
