import { GetEpicListResponse } from "@/src/type/epic";
import CustomSelect from "../../../Input/CustomSelect";
import { Get } from "@/src/repository";
import useSWR from "swr";

interface PropsType {
  selectEpicId: string;
  setSelectEpicId: (value: string) => void;
}

const EpicSelect = ({ selectEpicId, setSelectEpicId }: PropsType) => {
  const { data, isLoading } = useSWR("/v1/epic/list", async (url) =>
    Get<GetEpicListResponse>(url)
  );

  return (
    <CustomSelect
      option={"Epic"}
      height="40px"
      width="135px"
      placeholder="Epic"
      value={selectEpicId}
      setValue={(e) => setSelectEpicId(e.target.value)}
      item={
        isLoading
          ? []
          : data.data.data.map((item) => ({
              label: item.name,
              value: String(item.id),
            }))
      }
    />
  );
};

export default EpicSelect;
