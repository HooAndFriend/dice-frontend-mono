import { EpicStatus } from "@/src/type/epic";

interface PropsType {
  status: EpicStatus;
  value: EpicStatus;
  setStatus: (status: EpicStatus) => void;
}

const StatusItem = ({ status, setStatus, value }: PropsType) => {
  return (
    <div
      className={`cursor-pointer ${
        status === value && "border-b text-main border-main"
      }`}
      onClick={() => setStatus(value)}
    >
      {value}
    </div>
  );
};

export default StatusItem;
