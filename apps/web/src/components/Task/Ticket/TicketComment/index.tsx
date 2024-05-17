// ** React Imports
import { ChangeEvent, KeyboardEvent, useState } from "react";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import { Get, Post } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { GetTicketCommentListResponse } from "@/src/type/ticket";

// ** Components Imports
import CustomImage from "../../../Image/CustomImage";
import TicketCommentItem from "../TicketCommentItem";
import TicketCommentSkeleton from "./TicketCommentSkeleton";

interface PropsType {
  ticketId: number;
}

const TicketComment = ({ ticketId }: PropsType) => {
  const [comment, setComment] = useState<string>("");
  const [button, setButton] = useState<boolean>(false);

  const { handleOpen } = useDialog();

  const saveTicketComment = useSWRMutation(
    "/v1/ticket/comment",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, { content: comment, ticketId }),
    {
      onSuccess: () => {
        setButton(false);
        setComment("");
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
        setButton(false);
      },
    }
  );

  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
    mutate: commentRefetch,
  } = useSWR(`/v1/ticket/comment/${ticketId}`, async (url) =>
    Get<GetTicketCommentListResponse>(url)
  );

  const handleSaveTicketComment = () => {
    if (comment === "") {
      handleOpen({
        title: "Error",
        message: "Enter Comment",
        logLevel: "warn",
        buttonText: "Close",
        type: "alert",
      });

      return;
    }

    saveTicketComment.trigger();
  };

  const handleCommentEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (comment === "") {
        handleOpen({
          title: "Error",
          message: "Enter Comment",
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });

        return;
      }

      if (button) return;
      setButton(true);
      saveTicketComment.trigger();
    }
  };

  const handleComment = (e: ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  return (
    <div>
      <div className="flex mt-5">
        <input
          id="content"
          onChange={handleComment}
          value={comment}
          className="px-4 w-full border border-lightGray rounded-[10px] mr-[10px]"
          onKeyDown={handleCommentEnter}
        />
        <div
          onClick={handleSaveTicketComment}
          className="w-[40px] h-[40px] bg-black text-white rounded-[10px] flex justify-center items-center"
        >
          <CustomImage
            src="/images/plus.png"
            width={24}
            height={24}
            alt="plus"
          />
        </div>
      </div>
      <div className="mt-9">
        {commentLoading ? (
          <TicketCommentSkeleton />
        ) : (
          commentData.data.data.map((item) => (
            <TicketCommentItem
              key={item.id}
              data={item}
              commentRefetch={commentRefetch}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TicketComment;
