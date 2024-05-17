// ** React Imports
import { ChangeEvent } from "react";

// ** Componet Import
import CustomImage from "@/src/components/Image/CustomImage";

// ** Type Imports
import { CommentInfo } from "@/src/type/qa";

// ** Utils Imports
import dayjs from "dayjs";

// ** Recoil Imports
import { UserState } from "@/src/app";
import { useRecoilValue } from "recoil";

interface PropsType {
  data: CommentInfo;
  mode: "view" | "edit";
  comment: string;
  setMode: (mode: "view" | "edit") => void;
  handleComment: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUpdateComment: () => void;
  handleDeleteComment: () => void;
}

const CommentItem = ({
  data,
  mode,
  setMode,
  comment,
  handleComment,
  handleUpdateComment,
  handleDeleteComment,
}: PropsType) => {
  const { email } = useRecoilValue(UserState);

  return (
    <div className="w-full mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CustomImage
            className="rounded-full border border-lightGray mr-[10px]"
            src={data.user.profile}
            alt="profile"
            width={30}
            height={30}
          />
          <div className="flex font-spoqa">
            <div className="mr-[10px] text-[16px]">{data.user.nickname}</div>
            <div className="flex items-center text-[12px] text-darkGray">
              {dayjs(data.createdDate).format("YYYY-MM-DD HH:mm:ss")}
            </div>
            {email === data.user.email && (
              <>
                <div
                  className="flex items-center ml-4 mr-2 text-xs cursor-pointer text-darkGray"
                  onClick={() => setMode("edit")}
                >
                  edit
                </div>
                <div
                  className="flex items-center text-xs cursor-pointer text-darkGray"
                  onClick={handleDeleteComment}
                >
                  delete
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {mode === "view" ? (
        <div className="ml-[41px] mt-[9px] text-[16px]">{data.content}</div>
      ) : (
        <div className="ml-[41px] mt-5">
          <input
            id="content"
            onChange={handleComment}
            value={comment}
            className="px-4 h-[40px] w-full border border-lightGray rounded-[10px] mr-[10px]"
          />
          <div className="flex items-center mt-4">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              onClick={handleUpdateComment}
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

export default CommentItem;
