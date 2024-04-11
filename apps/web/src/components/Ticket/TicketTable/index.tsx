// ** Component Imports
import TicketAddItem from "../TicketAddItem";
import TicketHeader from "../TicketHeader";
import TicketItem from "../TicketItem";

// ** Type Imports
import { TicketInfo } from "@/src/type/ticket";

// ** Utils Imports
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface PropsType {
  data: TicketInfo[];
  handleClick?: (id: number) => void;
  onDragEnd: ({ source, destination }: DropResult) => void;
}

const TicketTable = ({ handleClick, data, onDragEnd }: PropsType) => {
  return (
    <div className="mt-6 h-[700px] overflow-auto w-full bg-white rounded-[20px] shadow-md p-4">
      <TicketHeader isEpic={false} />
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
                      <TicketItem
                        handleClick={handleClick}
                        data={item}
                        key={item.id}
                        isEpic={false}
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
      <TicketAddItem />
    </div>
  );
};

export default TicketTable;
