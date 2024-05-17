// ** Type Imports
import { IssueInfo } from "@/src/type/qa";

// ** Component Imports
import QuillEditor from "../../../QuillEditor";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";

interface PropsType {
  mode: "view" | "edit";
  data: IssueInfo;
  type: "asIs" | "toBe" | "memo" | "title";
  setMode: (mode: "view" | "edit") => void;
  setData: (data: IssueInfo) => void;
  handleUpdateQa: (type: "title" | "asIs" | "toBe" | "memo") => void;
}

const QaEditor = ({
  mode,
  data,
  type,
  setMode,
  setData,
  handleUpdateQa,
}: PropsType) => {
  const { role } = useRecoilValue(WorkspaceState);

  if (mode === "view") {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: data[type] }}
        className="p-4 border border-[#EBEBEC] h-[80px] w-full rounded-[10px] overflow-y-auto cursor-pointer"
        onDoubleClick={() => {
          if (role === "VIEWER") return;
          setMode("edit");
        }}
      />
    );
  }

  return (
    <div>
      <QuillEditor
        value={data[type]}
        onChange={(value: string) =>
          setData({ ...data, [type]: value } as IssueInfo)
        }
        name={type}
      />
      <div className="flex items-center mt-2">
        <button
          className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
          onClick={() => handleUpdateQa(type)}
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
  );
};

export default QaEditor;
