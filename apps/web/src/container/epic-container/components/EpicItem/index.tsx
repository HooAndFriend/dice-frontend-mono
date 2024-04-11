"use client";
// ** Next Imports
import Image from "next/image";

// ** React Imports
import { useEffect, useMemo, useState } from "react";

// ** Component Imports
import TicketItem from "@/src/components/Ticket/TicketItem";
import TicketHeader from "@/src/components/Ticket/TicketHeader";
import TicketAddItem from "@/src/components/Ticket/TicketAddItem";
import CustomImage from "@/src/components/Image/CustomImage";

// ** Type Imports
import { EpicInfo } from "@/src/type/epic";
import { CommonResponse } from "@/src/type/common";

// ** Utils Imports
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import { Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

interface PropsType {
  item: EpicInfo;
  handleClick: (id: number) => void;
}

const EpicItem = ({ item, handleClick }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  const { handleOpen: handleDialogOpen } = useDialog();

  const epicProgress = useMemo(() => {
    if (item.doneTicketCount === 0) {
      if (item.ticket.length === 0) return "0%";
      return "0%";
    }

    return `${(item.doneTicketCount / item.ticket.length) * 100}%`;
  }, [item]);

  const updateOrder = useSWRMutation(
    "/v1/ticket/order",
    async (
      url: string,
      { arg }: { arg: { ticketId: number; targetTicketId: number } }
    ) => await Patch<CommonResponse<void>>(url, arg),
    {
      onSuccess: ({ data }) => {
        mutate("/v1/epic");
      },
      onError: (error) => {
        handleDialogOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  const onDragEnd = ({ source, destination }: DropResult) => {
    updateOrder.trigger({
      ticketId: source.index,
      targetTicketId: destination.index,
    });
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return;

  return (
    <div>
      <div className="w-full h-[75px] flex items-center">
        <div className="w-[24px] h-[24px] bg-green-300 rounded-lg"></div>
        <h1 className="ml-8 w-[300px]">{item.code + " " + item.name}</h1>
        <div className="ml-8 w-[370px] bg-gray-200 rounded-full h-[24px] dark:bg-gray-700 flex items-center">
          <div
            className={`bg-blue-600 h-[24px] rounded-lg`}
            style={{
              width: epicProgress,
            }}
          />
        </div>
        <h4 className="ml-2">
          ({item.doneTicketCount}/{item.ticket.length})
        </h4>
        <div className="ml-auto">
          <CustomImage
            src={open ? "/svg/arrow-up.svg" : "/svg/arrow-down.svg"}
            alt="arrow"
            width={24}
            height={24}
            onClick={handleOpen}
          />
        </div>
      </div>
      {open && (
        <div>
          <TicketHeader isEpic />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {item.ticket.map((item) => (
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
                            isEpic
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
          <TicketAddItem epicId={item.id} />
        </div>
      )}

      <hr className="bg-[#EBEBEC]" />
    </div>
  );
};

export default EpicItem;
