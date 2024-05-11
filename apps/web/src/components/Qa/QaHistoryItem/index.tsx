// ** Type Imports
import { QaHistory, QaHistoryType } from "@/src/type/qa";
import CustomImage from "../../Image/CustomImage";
import dayjs from "dayjs";

interface PropsType {
  data: QaHistory;
}

const getLogText = (type: QaHistoryType) => {
  switch (type) {
    case "CREATE":
      return "QA를 생성했습니다.";
    case "ADMIN":
      return "Admin을 변경했습니다.";
    case "WORKER":
      return "Worker를 변경했습니다.";
    case "TITLE":
      return "제목을 변경했습니다.";
    case "STATUS":
      return "상태값을 변경했습니다.";
    case "CONTENT":
      return "내용을 변경했습니다.";
    case "UPLOAD_FILE":
      return "파일을 업로드했습니다.";
    case "DELETE_FILE":
      return "파일을 삭제했습니다.";
    case "DUE_DATE":
      return "마감일을 변경했습니다.";
    case "ASIS":
      return "As-Is내용을 업데이트했습니다.";
    case "TOBE":
      return "To-Be내용을 업데이트했습니다.";
    case "MEMO":
      return "Memo내용을 업데이트했습니다.";
  }
};

const QaHistoryItem = ({ data }: PropsType) => {
  return (
    <div className="w-full mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CustomImage
            className="rounded-full border border-lightGray mr-[10px]"
            alt="profile"
            src={data.user.profile}
            width={30}
            height={30}
          />
          <div className="flex font-spoqa">
            <div className="mr-[10px] text-[16px]">{data.user.nickname}</div>
            <div className="flex items-center text-darkGray text-[12px]">
              {dayjs(data.createdDate).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-[41px] mt-[9px] text-[16px]">
        {getLogText(data.type)}
      </div>
      {data.type !== "CREATE" && (
        <div className="ml-[41px] mt-[9px] text-[16px] bg-[#F3F3F3] px-[11px] py-[9px] rounded-[5px] text-[#404040] text-[14px]">
          {data.log}
        </div>
      )}
    </div>
  );
};

export default QaHistoryItem;
