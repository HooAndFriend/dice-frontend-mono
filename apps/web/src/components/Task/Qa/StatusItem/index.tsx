import { EpicStatus } from "@/src/type/epic";

interface PropsType {
  status: EpicStatus;
  value: EpicStatus;
  label?: string;
  setStatus: (status: EpicStatus) => void;
}

const StatusItem = ({ status, setStatus, value, label }: PropsType) => {
  return (
    <div
      className={`cursor-pointer ${
        status === value && "border-b text-main border-main"
      }`}
      onClick={() => setStatus(value)}
    >
      {label ? label : value}
    </div>
  );
};

export default StatusItem;
