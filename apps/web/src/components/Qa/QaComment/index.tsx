"use client";
// ** React Imports
import { KeyboardEvent, useState } from "react";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import { Get, Post } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

// ** Component Imports
import CustomImage from "@/src/components/Image/CustomImage";
import QaCommentItem from "../QaCommentItem";

// ** Type Imports
import { AddCommentResponse, GetCommentListResponse } from "@/src/type/qa";
import QaCommentSkeleton from "./QaCommentSkeleton";

interface PropsType {
  qaId: number;
}

const QaComment = ({ qaId }: PropsType) => {
  const [comment, setComment] = useState<string>("");
  const [button, setButton] = useState<boolean>(false);

  const { handleOpen } = useDialog();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const {
    data,
    error,
    isLoading,
    mutate: commentRefetch,
  } = useSWR(`/v1/qa/comment/${qaId}`, async (url) =>
    Get<GetCommentListResponse>(url)
  );

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
      addComment.trigger();
    }
  };

  const handleAddComment = () => {
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

    addComment.trigger();
  };

  //** 댓글 등록
  const addComment = useSWRMutation(
    "/v1/qa/comment",
    async (url: string) =>
      await Post<AddCommentResponse>(url, { content: comment, qaId }),
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
          onClick={handleAddComment}
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
        {isLoading ? (
          <QaCommentSkeleton />
        ) : (
          data.data.data.map((item) => (
            <QaCommentItem
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

export default QaComment;
