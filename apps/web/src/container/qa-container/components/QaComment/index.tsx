"use client";

// ** Recoil Imports
import { AuthState, UserState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import { Delete } from "@/src/repository";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { CommentInfo } from "@/src/type/qa";

interface PropsType {
  data: CommentInfo;
}

const QaComment = ({ data }: PropsType) => {
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(WorkspaceState);
  const { email } = useRecoilValue(UserState);

  const { handleOpen } = useDialog();

  const deleteComment = useSWRMutation(
    `/v1/qa/comment/${data.id}`,
    async (url: string) =>
      await Delete<CommonResponse<void>>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "workspace-code": `${uuid}`,
        },
      }),
    {
      onSuccess: () => {
        mutate("/v1/qa/comment");
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

  return (
    <div className="w-full h-[59px] mb-5">
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
              {data.createdDate}
            </div>
          </div>
        </div>
        {email === data.user.email && (
          <div className="flex items-center">
            <img src="/svg/note_edit.svg" className="cursor-pointer" />
            <div className="h-4 w-px bg-lightGray mx-[5px]"></div>
            <img
              src="/svg/trashcanIcon.svg"
              width={24}
              height={24}
              onClick={deleteComment.trigger}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="ml-[41px] mt-[9px]">{data.content}</div>
    </div>
  );
};

export default QaComment;
