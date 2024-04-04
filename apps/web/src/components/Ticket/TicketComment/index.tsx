"use client";
// ** React Imports
import { useState } from "react";

// ** Recoil Imports
import { UserState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import { Delete, Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { CommentInfo } from "@/src/type/qa";

// ** Utils Imports
import dayjs from "dayjs";

interface PropsType {
  data: CommentInfo;
  commentRefetch: () => void;
}

const TicketComment = ({ data, commentRefetch }: PropsType) => {
  const [content, setContent] = useState<string>(data.content);
  const [mode, setMode] = useState<"view" | "edit">("view");

  const { email } = useRecoilValue(UserState);

  const { handleOpen } = useDialog();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const deleteComment = useSWRMutation(
    `/v1/ticket/comment/${data.id}`,
    async (url: string) => await Delete<CommonResponse<void>>(url),
    {
      onSuccess: () => {
        commentRefetch();
      },
      onError: (error) => {
        handleOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  const updateComment = useSWRMutation(
    "/v1/ticket/comment",
    async (url: string) =>
      await Patch<CommonResponse<void>>(url, {
        commentId: data.id,
        content,
      }),
    {
      onSuccess: () => {
        commentRefetch();
        setMode("view");
      },
      onError: (error) => {
        handleOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  console.log(data);

  return (
    <div className="w-full mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="rounded-full border border-lightGray mr-[10px]"
            src={data.user.profile}
            width={30}
            height={30}
          />
          <div className="flex font-spoqa">
            <div className="mr-[10px]">{data.user.nickname}</div>
            <div className="flex items-center text-xs text-darkGray">
              {dayjs(data.createdDate).format("YYYY-MM-DD HH:mm:ss")}
            </div>
            {email === data.user.email && (
              <>
                <div
                  className="flex items-center ml-4 mr-2 text-xs text-darkGray"
                  onClick={() => setMode("edit")}
                >
                  edit
                </div>
                <div
                  className="flex items-center text-xs cursor-pointer text-darkGray"
                  onClick={deleteComment.trigger}
                >
                  delete
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {mode === "view" ? (
        <div className="ml-[41px] mt-[9px]">{data.content}</div>
      ) : (
        <div className="ml-[41px] mt-5">
          <input
            id="content"
            onChange={handleComment}
            value={content}
            className="px-4 h-[40px] w-full border border-lightGray rounded-[10px] mr-[10px]"
          />
          <div className="flex items-center mt-4">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              onClick={updateComment.trigger}
            >
              save
            </button>
            <button
              className="w-[60px] h-[30px] flex items-center justify-center rounded-[8px]"
              onClickCapture={() => setMode("view")}
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketComment;
