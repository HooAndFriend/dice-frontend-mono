// ** Component Imports
import EpicItem from "../EpicItem";
import EpicAddItem from "../EpicAddItem";

// ** Type Imports
import { EpicInfo } from "@/src/type/epic";

// ** Utils Imports
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface PropsType {
  epicData: EpicInfo[];
  word: string;
  handleClick: (id: number) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const EpicTable = ({ epicData, word, onDragEnd, handleClick }: PropsType) => {
  return (
    <div className="mt-6 h-[700px] overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {epicData.map((item) => (
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
                      <EpicItem
                        key={item.id}
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
      <EpicAddItem />
    </div>
  );
};
export default EpicTable;
