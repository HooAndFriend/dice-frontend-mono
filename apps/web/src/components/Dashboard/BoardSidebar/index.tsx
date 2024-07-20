"use client";
// ** React Imports
import { useRef, useState } from "react";

// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Type Imports
import { GetBoardListResponse } from "@/src/type/board";

// ** Component Imports
import BoardMenuItem from "./BoardMenuItem";
import BoardSaveModal from "../../Modal/BoardSaveModal";

const BoardSidebar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    data: boardData,
    isLoading,
    mutate,
  } = useSWR("/v1/board", async (url) => {
    return Get<GetBoardListResponse>(url);
  });

  const cancelButtonRef = useRef();

  console.log("Board ", boardData);

  if (isLoading) return;

  return (
    <div className="w-[300px] bg-white border-r-2 border-[#EBEBEC] px-4 py-2">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[14px] font-bold">Content</h1>
        <button
          className="w-[20px] font-bold text-[16px] h-[20px] cursor-pointer"
          onClick={() => setOpen(true)}
        >
          +
        </button>
      </div>
      <div className="mt-4">
        {boardData.data.data.map((item) => (
          <BoardMenuItem data={item} key={item.boardId} />
        ))}
      </div>
      {open && (
        <BoardSaveModal
          open={open}
          setOpen={setOpen}
          refetch={mutate}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  );
};

export default BoardSidebar;
