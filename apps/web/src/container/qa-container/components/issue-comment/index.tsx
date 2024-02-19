import useSWR from "swr";
import IssueCommentView from "./issue-comment";
import {useRecoilValue} from "recoil";
import {AuthState, WorkspaceState} from "@/src/app";
import {Get} from "@/src/repository";
import {CommentInfo, GetCommentListResponse} from "@/src/type/qa";

interface PropsType {
  data: CommentInfo;
}

const IssueComment = ({data}: PropsType) => {
  return <IssueCommentView data={data} />;
};

export default IssueComment;
