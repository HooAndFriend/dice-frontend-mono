import {CommentInfo} from "@/src/type/qa";

interface PropsType {
  data: CommentInfo;
}

const IssueCommentView = ({data}: PropsType) => {
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
            <div className="text-darkGray text-xs flex items-center">
              {data.createdDate}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <img src="/svg/note_edit.svg" />
          <div className="h-4 w-px bg-lightGray mx-[5px]"></div>
          <img src="/svg/trashcanIcon.svg" width={24} height={24} />
        </div>
      </div>
      <div className="ml-[41px] mt-[9px]">{data.content}</div>
    </div>
  );
};

export default IssueCommentView;
