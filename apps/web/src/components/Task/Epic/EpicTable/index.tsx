// ** Component Imports

// ** Type Imports
import { EpicInfo, SelectContent } from "@/src/type/epic";

// ** Utils Imports
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

// ** Recoil Imports
import { WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";
import EpicItem from "../EpicItem";
import EpicAddItem from "../EpicAddItem";

interface PropsType {
  epicData: EpicInfo[];
  word: string;
  handleClick: (value: SelectContent) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const EpicTable = ({ epicData, word, onDragEnd, handleClick }: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState);

  return (
    <div className="h-[564px] overflow-y-auto w-full bg-white rounded-[20px] shadow-md px-[24px]">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {epicData.map((item) => (
                <Draggable
                  key={item.epicId}
                  draggableId={item.epicId.toString()}
                  index={item.epicId}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <EpicItem
                        key={item.epicId}
                        item={item}
                        word={word}
                        handleClick={handleClick}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {role !== "VIEWER" && <EpicAddItem />}
    </div>
  );
};
export default EpicTable;
