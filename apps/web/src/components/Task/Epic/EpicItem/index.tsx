"use client";

// ** React Imports
import {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";

// ** Component Imports
import TicketItem from "@/src/components/Task/Ticket/TicketItem";
import TicketHeader from "@/src/components/Task/Ticket/TicketHeader";
import TicketAddItem from "@/src/components/Task/Ticket/TicketAddItem";
import CustomImage from "@/src/components/Image/CustomImage";

// ** Type Imports
import { EpicInfo, SelectContent } from "@/src/type/epic";
import { CommonResponse, NoneType } from "@/src/type/common";

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

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";

interface PropsType {
  item: EpicInfo;
  word: string;
  handleClick: (value: SelectContent) => void;
}

const EpicItem = ({ item, handleClick, word }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  const { handleOpen: handleDialogOpen } = useDialog();

  const { role } = useRecoilValue(WorkspaceState);

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
      <div
        className="w-full h-[74px] py-[25px] flex items-center cursor-pointer"
        onClick={() => {
          handleClick({ id: item.epicId, type: "EPIC" });
        }}
      >
        <div className="w-[30%]">
          <h1 className=" font-san-bold text-[16px] overflow-hidden whitespace-nowrap text-overflow-ellipsis">
            {`${item.code}  ${item.name}`}
          </h1>
        </div>
        <div className="w-[30%]">
          <div className="w-full bg-[#F4F4FA] border-[1px] border-[#EBEBEC] rounded-[6px] h-[24px] dark:bg-gray-700 flex items-center">
            <div
              className={`bg-[#623AD6] h-[22px] rounded-[5px] border-[1px] border-[#EBEBEC]`}
              style={{
                width: epicProgress,
              }}
            />
          </div>
        </div>
        <div className="w-[10%] justify-center flex">
          <h4 className="text-[16px] font-san-medium">
            {item.doneTicketCount === 0
              ? 0
              : ((item.doneTicketCount / item.ticket.length) * 100).toFixed(
                  2
                )}{" "}
            %
          </h4>
        </div>
        <div className="flex w-[30%] justify-between">
          <h4 className="ml-[20px] text-[16px] font-san-medium text-[#676767]">
            ({item.doneTicketCount}/{item.ticket.length})
          </h4>
          <CustomImage
            src={open ? "/svg/arrow-up.svg" : "/svg/arrow-down.svg"}
            alt="arrow"
            width={24}
            height={24}
            onClick={(e: NoneType) => {
              e.stopPropagation();
              handleOpen();
            }}
          />
        </div>
      </div>
      {open && (
        <div>
          <TicketHeader />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {item.ticket.map((item) => (
                    <Draggable
                      key={item.ticketId}
                      draggableId={item.ticketId.toString()}
                      index={item.ticketId}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TicketItem
                            handleClick={(id: number) =>
                              handleClick({ id, type: "TICKET" })
                            }
                            word={word}
                            data={item}
                            key={item.ticketId}
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
          {role !== "VIEWER" && <TicketAddItem epicId={item.epicId} />}
        </div>
      )}
      <hr className="bg-[#EBEBEC]" />
    </div>
  );
};

export default EpicItem;
